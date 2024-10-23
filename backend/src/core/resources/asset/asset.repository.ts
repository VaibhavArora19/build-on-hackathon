import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Asset } from './asset.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAssetDto } from 'src/core/resources/asset/dto/create-asset.dto';

@Injectable()
export class AssetRepository {
  constructor(@InjectModel(Asset.name) private assetModel: Model<Asset>) {}

  async getAssets() {
    const data = await this.assetModel.aggregate([
      {
        $group: {
          _id: { assetSymbol: '$assetSymbol', protocolType: '$protocolType' },
          points: { $addToSet: '$points' },
          chainIds: { $addToSet: '$chainId' },
          protocolNames: { $addToSet: '$protocolName' },
          assetSupplyApys: { $push: '$assetSupplyApy' },
          assetSupplyBoostedApys: { $push: '$assetSupplyBoostedApy' },
        },
      },
      {
        $project: {
          _id: 0,
          assetSymbol: '$_id.assetSymbol',
          protocolType: '$_id.protocolType',
          chainIds: 1,
          protocolNames: 1,
          assetSupplyApys: 1,
          assetSupplyBoostedApys: 1,
          points: 1,
        },
      },
      {
        $addFields: {
          totalApys: {
            $map: {
              input: { $range: [0, { $size: '$assetSupplyApys' }] },
              as: 'idx',
              in: {
                $add: [
                  { $arrayElemAt: ['$assetSupplyApys', '$$idx'] },
                  { $arrayElemAt: ['$assetSupplyBoostedApys', '$$idx'] },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          assetSupplyApys: {
            $sortArray: { input: '$assetSupplyApys', sortBy: 1 },
          },
          assetSupplyBoostedApys: {
            $sortArray: { input: '$assetSupplyBoostedApys', sortBy: 1 },
          },
          totalApys: {
            $sortArray: { input: '$totalApys', sortBy: 1 },
          },
        },
      },
    ]);

    return data;
  }

  async getProtocols() {
    const data: Array<{ protocolName: string; protocolType: string }> =
      await this.assetModel.aggregate([
        {
          $group: {
            _id: '$protocolName', // Group by protocolName to ensure uniqueness
            protocol: { $first: '$$ROOT' }, // Take the first document in each group
          },
        },
        {
          $replaceRoot: { newRoot: '$protocol' },
        }, // Replace the root with the original protocol document
        {
          $project: { _id: 0, protocolName: 1, protocolType: 1 },
        }, // Project only the desired fields
      ]);

    return data;
  }

  async getAssetBySymbol(symbol: string) {
    const data = await this.assetModel.find({ assetSymbol: symbol });

    if (data.length === 0) throw new NotFoundException('No asset found');

    return data;
  }

  async getAssetByProtocolType(protocolType: string) {
    const data = await this.assetModel.find({ protocolType }).lean();

    if (data.length === 0) throw new NotFoundException('No assets found');

    return data;
  }

  async getAssetById(id: string) {
    const data = await this.assetModel.findOne({ assetId: id });

    if (!data) throw new NotFoundException('No asset found');

    return data;
  }

  async getFilteredAssets(
    excludeProtocol: string,
    includeProtocolType: string,
  ) {
    let query = {};

    if (excludeProtocol) {
      query = {
        ...query,
        protocolName: { $ne: excludeProtocol },
      };
    }

    if (includeProtocolType) {
      query = {
        ...query,
        protocolType: includeProtocolType,
      };
    }

    const data = await this.assetModel.find(query);

    return data;
  }

  createAsset(asset: CreateAssetDto & { assetId: string }) {
    const newAsset = new this.assetModel(asset);

    return newAsset.save();
  }

  async createAssets(assets: Array<CreateAssetDto & { assetId: string }>) {
    const assetsData = await this.assetModel.insertMany(assets);

    return assetsData;
  }

  async isAssetSupported(
    protocolName: string,
    chainId: string,
    assetAddress: string,
    type: ProtocolType,
  ) {
    const asset = await this.assetModel.findOne({
      protocolName,
      chainId,
      assetAddress,
      protocolType: type,
    });

    return asset ? true : false;
  }
}
