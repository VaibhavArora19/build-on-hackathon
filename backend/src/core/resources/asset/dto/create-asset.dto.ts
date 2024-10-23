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
}
