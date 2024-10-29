import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  protocolName: string;

  @IsString()
  @IsNotEmpty()
  chainId: string;

  @IsString()
  @IsNotEmpty()
  assetName: string;

  @IsString()
  @IsNotEmpty()
  assetSymbol: string;

  @IsString()
  @IsNotEmpty()
  assetAddress: string;

  @IsNumber()
  @IsNotEmpty()
  assetDecimals: number;

  @IsString()
  @IsNotEmpty()
  underlyingAssetSymbol: string;

  @IsString()
  @IsNotEmpty()
  underlyingAssetAddress: string;

  @IsNumber()
  @IsNotEmpty()
  underlyingAssetDecimals: number;

  @IsNumber()
  @IsNotEmpty()
  assetSupplyApy: number;
}
