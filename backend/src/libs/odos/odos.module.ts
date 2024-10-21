import { DynamicModule, Module } from '@nestjs/common';
import { OdosService } from './odos.service';

@Module({})
export class OdosModule {
  static register(): DynamicModule {
    return {
      module: OdosModule,
      providers: [OdosService],
      exports: [OdosService],
    };
  }
}
