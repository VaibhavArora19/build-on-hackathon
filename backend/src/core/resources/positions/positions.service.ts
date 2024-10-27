import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Moralis from 'moralis';
import { MORALIS_CHAINS } from 'src/constants/chain';

@Injectable()
export class PositionsService {
  constructor(private readonly configService: ConfigService) {}

  async getPositions(address: string) {
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

    console.log('balances are: ', balances);

    return balances;
  }
}
