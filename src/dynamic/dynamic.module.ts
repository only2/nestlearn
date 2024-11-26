import { DynamicModule, Module } from '@nestjs/common';
import { DynamicService } from './dynamic.service';
import { DynamicController } from './dynamic.controller';

@Module({})
export class MyDynamicModule {
static register(options: Record<string, any>): DynamicModule {
    return {
      module: MyDynamicModule,
      controllers: [DynamicController],
      providers: [
        {
          provide: 'MY_DYNAMIC_CONFIG_OPTIONS',
          useValue: options,
        },
        DynamicService
      ],
      exports: [],
    };
  }
}
