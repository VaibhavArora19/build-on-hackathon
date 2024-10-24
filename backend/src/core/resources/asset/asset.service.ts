import { Injectable } from '@nestjs/common';
import { AssetRepository } from 'src/core/resources/asset/asset.repository';
import { CreateAssetDto } from 'src/core/resources/asset/dto/create-asset.dto';

@Injectable()
export class AssetService {
  constructor(private readonly assetRepository: AssetRepository) {}

  async getAssets() {
    const data = await this.assetRepository.getAssets();

    return data;
  }

  async getAssetBySymbol(symbol: string) {
    const data = await this.assetRepository.getAssetBySymbol(
      decodeURIComponent(symbol),
    );

    return data;
  }

  async getAssetById(id: string) {
    const data = await this.assetRepository.getAssetById(id);

    return data;
  }

  async createAsset(createAssetDto: CreateAssetDto) {
    const assetId = this.generateAssetId(createAssetDto);

    const asset = {
      assetId,
      ...createAssetDto,
    };

    const data = await this.assetRepository.createAsset(asset);

    return data;
  }

  async getAssetByProtocol(createAssetDto: Partial<CreateAssetDto>) {
    const asset = this.assetRepository.getAssetByProtocol(createAssetDto);

    return asset;
  }

  private generateAssetId(createAssetDto: CreateAssetDto) {
    const assetId =
      createAssetDto.protocolName +
      '-' +
      createAssetDto.assetSymbol +
      '-' +
      createAssetDto.chainId;

    return assetId;
  }
}
