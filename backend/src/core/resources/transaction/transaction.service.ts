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
  //!here toToken will be underlying token so fetch the token to buy from db
  async prepareTransaction(transactionPayload: CreateTransactionDto) {
    try {
      //!get the asset
      const asset = await this.assetService.getAssetByProtocol({
        underlyingAssetAddress: transactionPayload.toToken,
        chainId: transactionPayload.toChain,
        protocolName: transactionPayload.protocolName,
      });

      const squidQuote = await this.squidService.createQuote({
        ...transactionPayload,
        fromAddress: transactionPayload.userAddress,
        toAddress: transactionPayload.userAddress,
      });

      const toAmountMin = squidQuote.estimate.toAmountMin;

      const odosQuote = await this.odosService.getQuote(
        +transactionPayload.toChain,
        transactionPayload.toToken, //!this will be the token squid will get on dest chain
        toAmountMin, //!min amount squid will give on dest chain
        asset.assetAddress, //!the token user should receive
        transactionPayload.userAddress,
      );

      const pathId = odosQuote.pathId;

      if (!pathId) throw new BadRequestException('Odos failed to quote');

      const odosTx = await this.odosService.assembleQuote(
        pathId,
        transactionPayload.userAddress,
      );

      const postHook: Omit<Hook, 'fundAmount' | 'fundToken'> = {
        chainType: ChainType.EVM,
        calls: [
          {
            chainType: ChainType.EVM,
            callType: SquidCallType.DEFAULT,
            target: odosTx.transaction.to,
            callData: odosTx.transaction.data,
            estimatedGas: '500000',
            payload: {
              tokenAddress: transactionPayload.toToken,
              inputPos: 1,
            },
          },
        ],
        description: 'Test',
        logoURI: 'anything',
        provider: 'Test',
      };

      const squidTx = await this.squidService.createQuote({
        ...transactionPayload,
        fromAddress: transactionPayload.userAddress,
        toAddress: transactionPayload.userAddress,
        postHook,
      });

      return {
        to: '',
        type: 'SQUID',
        tx: squidTx,
      };
    } catch (error) {
      console.log('error: ', error);
      throw new BadRequestException(error);
    }
  }

  async getQuote() {}
}
