import { BadRequestException, Injectable } from '@nestjs/common';
import { OdosService } from 'src/libs/odos/odos.service';
import { SquidService } from 'src/libs/squid/squid.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ChainType, Hook, SquidCallType } from '@0xsquid/squid-types';
import { AssetService } from '../asset/asset.service';
import { ethers } from 'ethers';
import { ERC20_ABI } from 'src/constants/abi';
import { SQUID_MULTICALL } from 'src/constants';

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
      const transactions = [];
      if (transactionPayload.type === 'SUPPLY') {
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

        const erc20Interface = new ethers.Interface(ERC20_ABI);

        const approveTx = erc20Interface.encodeFunctionData('approve', [
          odosTx.transaction.to,
          '1',
        ]);

        const postHook: Omit<Hook, 'fundAmount' | 'fundToken'> = {
          chainType: ChainType.EVM,
          description: 'test deposit',
          calls: [
            {
              chainType: ChainType.EVM,
              callType: SquidCallType.FULL_TOKEN_BALANCE,
              target: transactionPayload.toToken,
              callData: approveTx,
              estimatedGas: '400000',
              value: '0',
              payload: {
                tokenAddress: transactionPayload.toToken,
                inputPos: 1,
              },
            },
            {
              chainType: ChainType.EVM,
              callType: SquidCallType.DEFAULT,
              target: odosTx.transaction.to,
              callData: odosTx.transaction.data,
              estimatedGas: '500000',
              value: '0',
              payload: {
                tokenAddress: transactionPayload.toToken,
                inputPos: 1,
              },
            },
          ],
          logoURI: 'test URI',
          provider: 'test',
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
          chain: transactionPayload.fromChain,
        };
      } else {
        //!get the asset
        const asset = await this.assetService.getAssetByProtocol({
          assetAddress: ethers.getAddress(transactionPayload.fromToken),
          chainId: transactionPayload.fromChain,
          protocolName: transactionPayload.protocolName,
        });

        const odosQuote = await this.odosService.getQuote(
          +transactionPayload.fromChain,
          ethers.getAddress(transactionPayload.fromToken),
          transactionPayload.fromAmount,
          ethers.getAddress(asset.underlyingAssetAddress),
          transactionPayload.userAddress,
        );

        const pathId = odosQuote.pathId;

        if (!pathId) throw new BadRequestException('Odos failed to quote');

        const odosTx = await this.odosService.assembleQuote(
          pathId,
          transactionPayload.userAddress,
        );

        const erc20Interface = new ethers.Interface(ERC20_ABI);

        const approveTx = erc20Interface.encodeFunctionData('approve', [
          odosTx.transaction.to,
          transactionPayload.fromAmount,
        ]);

        transactions.push({
          to: transactionPayload.fromToken,
          tx: approveTx,
          type: 'APPROVE',
          chain: transactionPayload.fromChain,
        });

        transactions.push({
          to: odosTx.transaction.to,
          tx: odosTx.transaction.data,
          type: 'SWAP',
          chain: transactionPayload.fromChain,
        });

        // const preHook: Hook = {
        //   chainType: ChainType.EVM,
        //   fundToken: asset.assetAddress,
        //   fundAmount: transactionPayload.fromAmount,
        //   description: 'test withdrawal',
        //   logoURI: 'test URI',
        //   provider: 'test',
        //   calls: [
        //     {
        //       chainType: ChainType.EVM,
        //       callType: SquidCallType.FULL_TOKEN_BALANCE,
        //       target: transactionPayload.fromToken,
        //       callData: approveTx,
        //       estimatedGas: '400000',
        //       value: '0',
        //       payload: {
        //         tokenAddress: transactionPayload.fromToken,
        //         inputPos: 1,
        //       },
        //     },
        //     {
        //       chainType: ChainType.EVM,
        //       callType: SquidCallType.DEFAULT,
        //       target: odosTx.transaction.to,
        //       callData: odosTx.transaction.data,
        //       estimatedGas: '400000',
        //       value: '0',
        //       payload: {
        //         tokenAddress: transactionPayload.fromToken,
        //         inputPos: 1,
        //       },
        //     },
        //   ],
        // };

        // console.log('pp', preHook);

        const squidTx = await this.squidService.createQuote({
          ...transactionPayload,
          fromToken: asset.underlyingAssetAddress,
          fromAmount: odosQuote.outAmounts[0],
          fromAddress: transactionPayload.userAddress,
          toAddress: transactionPayload.userAddress,
          // preHook,
        });

        transactions.push({
          to: '',
          tx: squidTx,
          type: 'SQUID',
          chain: transactionPayload.fromChain,
        });

        return transactions;
        // return {
        //   to: '',
        //   type: 'SQUID',
        //   tx: squidTx,
        //   chain: transactionPayload.fromChain,
        // };
      }
    } catch (error) {
      console.log('error: ', error);
      throw new BadRequestException(error);
    }
  }
}
