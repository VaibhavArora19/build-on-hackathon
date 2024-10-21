import { DynamicModule, Module } from '@nestjs/common';
import { SquidService } from './squid.service';

@Module({})
export class SquidModule {
  static register(): DynamicModule {
    return {
      module: SquidModule,
      providers: [SquidService],
      exports: [SquidService],
    };
  }
}
