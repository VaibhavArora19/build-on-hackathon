import { BadRequestException, Injectable } from '@nestjs/common';
import { OdosService } from 'src/libs/odos/odos.service';
import { SquidService } from 'src/libs/squid/squid.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ChainType, Hook, SquidCallType } from '@0xsquid/squid-types';
import { AssetService } from '../asset/asset.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly squidService: SquidService,
    private readonly odosService: OdosService,
    private readonly assetService: AssetService,
  ) {}

  //!this is pending and not implemented properly
  async prepareTransaction(transactionPayload: CreateTransactionDto) {
    try {
      const squidQuote = await this.squidService.createQuote({
        ...transactionPayload,
        fromAddress: transactionPayload.userAddress,
        toAddress: transactionPayload.userAddress,
      });

      console.log('Squid Quote: ', squidQuote);

      const toAmount = squidQuote.estimate.toAmountMin;

      const odosQuote = await this.odosService.getQuote(
        +transactionPayload.toChain,
        transactionPayload.fromToken, //!this will be the token squid will get on dest chain
        transactionPayload.fromAmount,
        transactionPayload.toToken,
        transactionPayload.userAddress,
      );

      const pathId = odosQuote.pathId;

      if (!pathId) throw new BadRequestException('Odos failed to quote');

      const odosTx = await this.odosService.assembleQuote(
        pathId,
        transactionPayload.userAddress,
      );

      const postHook: Hook = {
        chainType: ChainType.EVM,
        fundAmount: transactionPayload.fromAmount,
        fundToken: transactionPayload.fromToken, //!change it too
        calls: [
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: odosTx.transaction.to,
            callData: odosTx.transaction.data,
            estimatedGas: '500000',
          },
        ],
        description: 'Test',
        logoURI: '',
        provider: 'Test',
      };

      const squidTx = await this.squidService.createQuote({
        ...transactionPayload,
        postHook,
      });

      return squidTx;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getQuote() {}
}
