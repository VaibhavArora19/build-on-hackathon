import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Moralis from 'moralis';
import { MORALIS_CHAINS } from 'src/constants/chain';
import { AssetService } from '../asset/asset.service';
import { ethers } from 'ethers';

@Injectable()
export class PositionsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly assetService: AssetService,
  ) {}

  async getPositions(address: string) {
    const assets = await this.assetService.getAllAssets();

    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: this.configService.get<string>('MORALIS_API_KEY'),
      });
    }

    const balances = await Promise.all(
      MORALIS_CHAINS.map((chain) =>
        Moralis.EvmApi.token.getWalletTokenBalances({
          address,
          chain: chain.id,
        }),
      ),
    );

    const allChainBalances = [];

    balances.forEach((chainBalance) => {
      chainBalance.raw.forEach((balance) => allChainBalances.push(balance));
    });

    const formattedBalance = allChainBalances.filter((balance) =>
      assets.some(
        (asset) =>
          ethers.getAddress(asset.assetAddress) ===
          ethers.getAddress(balance.token_address),
      ),
    );
    return formattedBalance;
  }
}
