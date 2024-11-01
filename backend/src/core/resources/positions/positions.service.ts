import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { COVALENT_CHAINS } from 'src/constants/chain';
import { AssetService } from '../asset/asset.service';
import { ethers } from 'ethers';
import { ChainID, CovalentClient } from '@covalenthq/client-sdk';

@Injectable()
export class PositionsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly assetService: AssetService,
  ) {}

  async getPositions(address: string) {
    const assets = await this.assetService.getAllAssets();

    const client = new CovalentClient(
      this.configService.get<string>('COVALENT_KEY'),
    );

    const balances = await Promise.all(
      COVALENT_CHAINS.map((chain) => {
        return client.BalanceService.getTokenBalancesForWalletAddress(
          chain.chainId as ChainID,
          address,
        );
      }),
    );

    console.log('bb', balances);

    const allBalances = [];

    //*merge them into single array
    balances.forEach((chainBalance) => {
      if (chainBalance.error) return;
      chainBalance.data.items.forEach((balance) =>
        allBalances.push({
          address: balance.contract_address,
          symbol: balance.contract_ticker_symbol,
          name: balance.contract_name,
          balance: balance.balance.toString(),
          balanceUSD: balance.pretty_quote_24h,
        }),
      );
    });

    //*find only those that exist in our db
    const formattedBalance = allBalances.filter((balance) =>
      assets.some(
        (asset) =>
          ethers.getAddress(asset.assetAddress) ===
            ethers.getAddress(balance.address) &&
          balance.symbol.toLowerCase() === asset.assetSymbol.toLowerCase(),
      ),
    );

    const balanceWithChain = formattedBalance.map((balance) => {
      const asset = assets.find(
        (asset) =>
          ethers.getAddress(asset.assetAddress) ===
          ethers.getAddress(balance.address),
      );

      if (asset && balance.balance != '0')
        return {
          ...balance,
          balance: ethers
            .formatUnits(balance.balance, asset.assetDecimals)
            .substring(0, 8),
          chainId: asset.chainId,
          protocolName: asset.protocolName,
          underlyingAssetSymbol: asset.underlyingAssetSymbol,
          underlyingAssetAddress: asset.underlyingAssetAddress,
          assetDecimals: asset.assetDecimals,
        };
    });
    const clearedBalance = balanceWithChain.filter(
      (balance) => balance !== undefined,
    );
    console.log('balance with chain', balanceWithChain);
    return clearedBalance;
  }
}
