import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './constants';
import { ConfigOptions } from './interfaces/config-options.interface';

@Module({})
export class ConfigManualModule {
  static register(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigManualModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
