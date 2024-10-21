import { BadRequestException, Injectable } from '@nestjs/common';
import { ODOS_URL } from 'src/constants';

@Injectable()
export class OdosService {
  constructor() {}

  async getQuote(
    chainId: number,
    fromToken: string,
    fromAmount: string,
    toToken: string,
    userAddress: string,
  ) {
    try {
      const response = await fetch(`${ODOS_URL}/sor/quote/v2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chainId,
          inputTokens: [
            {
              amount: fromAmount,
              tokenAddress: fromToken,
            },
          ],
          outputTokens: [
            {
              proportion: 1,
              tokenAddress: toToken,
            },
          ],
          userAddr: userAddress,
        }),
      });

      const data = await response.json();

      console.log('data is', data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async assembleQuote(pathId: string, userAddress: string) {
    try {
      const response = await fetch(`${ODOS_URL}/sor/assemble`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pathId,
          userAddr: userAddress,
        }),
      });

      const data = await response.json();

      console.log('data is', data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
