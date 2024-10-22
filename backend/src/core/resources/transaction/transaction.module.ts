import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { SquidModule } from 'src/libs/squid/squid.module';

@Module({
  imports: [SquidModule.register()],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
