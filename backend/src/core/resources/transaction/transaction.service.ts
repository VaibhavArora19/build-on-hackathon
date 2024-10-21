import { Injectable } from '@nestjs/common';
import { SquidService } from 'src/libs/squid/squid.service';

@Injectable()
export class TransactionService {
  constructor(private readonly squidService: SquidService) {}

  async prepareTransaction() {}

  async getQuote() {}
}
