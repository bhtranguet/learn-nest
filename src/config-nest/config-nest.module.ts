import { Module } from '@nestjs/common';
import { ConfigNestController } from './config-nest.controller';

@Module({
  controllers: [ConfigNestController],
})
export class ConfigNestModule {}
