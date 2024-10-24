import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('prepare')
  async prepareTransaction(@Body() transactionPayload: CreateTransactionDto) {
    const data =
      await this.transactionService.prepareTransaction(transactionPayload);

    return {
      status: HttpStatus.CREATED,
      data,
    };
  }
}
