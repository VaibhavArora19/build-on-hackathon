import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('prepare')
  async prepareTransaction(@Body() transactionPayload: any) {
    const data =
      await this.transactionService.prepareTransaction(transactionPayload);

    return {
      status: HttpStatus.CREATED,
      data,
    };
  }
}
