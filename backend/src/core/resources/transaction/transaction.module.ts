import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { SquidModule } from 'src/libs/squid/squid.module';
import { OdosModule } from 'src/libs/odos/odos.module';
import { AssetModule } from '../asset/asset.module';

@Module({
  imports: [SquidModule.register(), OdosModule.register(), AssetModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
