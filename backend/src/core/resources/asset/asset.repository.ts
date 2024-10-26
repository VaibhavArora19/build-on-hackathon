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
          _id: { underlyingAssetSymbol: '$underlyingAssetSymbol' },
          chainIds: { $addToSet: '$chainId' },
          protocolNames: { $addToSet: '$protocolName' },
          assetSupplyApys: { $push: '$assetSupplyApy' },
          assetSupplyBoostedApys: { $push: '$assetSupplyBoostedApy' },
        },
      },
      {
        $project: {
          _id: 0,
          underlyingAssetSymbol: '$_id.underlyingAssetSymbol',
          chainIds: 1,
          protocolNames: 1,
          assetSupplyApys: 1,
          assetSupplyBoostedApys: 1,
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

  async getAssetBySymbol(symbol: string) {
    const data = await this.assetModel.find({ underlyingAssetSymbol: symbol });

    if (data.length === 0) throw new NotFoundException('No asset found');

    return data;
  }

  async getAssetById(id: string) {
    const data = await this.assetModel.findOne({ assetId: id });

    if (!data) throw new NotFoundException('No asset found');

    return data;
  }

  async getAssetByProtocol(asset: Partial<CreateAssetDto>) {
    const data = await this.assetModel.findOne({
      underlyingAssetAddress: asset.underlyingAssetAddress,
      chainId: asset.chainId,
      protocolName: asset.protocolName,
    });

    if (!data) throw new NotFoundException('No asset found');

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
  ) {
    const asset = await this.assetModel.findOne({
      protocolName,
      chainId,
      assetAddress,
    });

    return asset ? true : false;
  }
}
