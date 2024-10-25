import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from 'src/core/resources/asset/dto/create-asset.dto';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAssets() {
    const data = await this.assetService.getAssets();
    return {
      statusCode: HttpStatus.OK,
      message: 'Fetched assets successfully',
      data,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('symbol')
  async getAssetBySymbol(@Query('symbol') symbol: string) {
    console.log('request came with symbol', symbol);
    const data = await this.assetService.getAssetBySymbol(symbol);

    return {
      statusCode: HttpStatus.OK,
      message: 'Fetched assets successfully by symbol',
      data,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('id/:id')
  async getAssetById(@Param('id') id: string) {
    const data = await this.assetService.getAssetById(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Fetched asset successfully by id',
      data,
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createAsset(@Body() createAssetDto: CreateAssetDto) {
    console.log('data', createAssetDto);
    const data = await this.assetService.createAsset(createAssetDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created asset successfully',
      data,
    };
  }
}
