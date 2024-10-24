import { BadRequestException, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
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
              tokenAddress: ethers.getAddress(fromToken),
            },
          ],
          outputTokens: [
            {
              proportion: 1,
              tokenAddress: ethers.getAddress(toToken),
            },
          ],
          userAddr: userAddress,
        }),
      });

      const data = await response.json();

      console.log('Odos quote: ', data);

      return data;
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

      console.log('Odos Tx: ', data);

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
