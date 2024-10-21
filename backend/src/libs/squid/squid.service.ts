import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Squid } from '@0xsquid/sdk';
import { SQUID_BASE_URL } from 'src/constants';
import { RouteRequest } from '@0xsquid/squid-types';

@Injectable()
export class SquidService {
  squid: Squid;

  constructor(private readonly configService: ConfigService) {
    this.squid = new Squid({
      baseUrl: SQUID_BASE_URL,
      integratorId: this.configService.get<string>('SQUID_INTEGRATOR_ID'),
    });
  }

  async getSquidTokens() {
    try {
      await this.squid.init();

      const tokens = this.squid.tokens;

      return tokens;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getSquidChains() {
    try {
      await this.squid.init();

      const chains = this.squid.chains;

      return chains;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createQuote(squidQuoteArgs: Partial<RouteRequest>) {
    try {
      await this.squid.init();

      const config: RouteRequest = {
        fromChain: squidQuoteArgs.fromChain,
        toChain: squidQuoteArgs.toChain,
        fromToken: squidQuoteArgs.fromToken,
        toToken: squidQuoteArgs.toToken,
        fromAmount: squidQuoteArgs.fromAmount,
        fromAddress: squidQuoteArgs.fromAddress,
        toAddress: squidQuoteArgs.toAddress,
        enableBoost: true,
      };

      if (squidQuoteArgs?.preHook) {
        config.preHook = squidQuoteArgs.preHook;
      }

      if (squidQuoteArgs.postHook) {
        config.postHook = squidQuoteArgs.postHook;
      }

      const { route } = await this.squid.getRoute(config);

      return route;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
