import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('config-nest')
export class ConfigNestController {
  constructor(private readonly configService: ConfigService) {}
  @Get()
  async testConfig() {
    return this.configService.get<string>('HELLO_MESSAGE');
  }

  @Get('custom-config-file')
  async testCustomConfigFile() {
    return this.configService.get<string>('database.host');
  }

  @Get('yaml')
  async yamlConfig() {
    return this.configService.get<string>('logging.LOG_FILE');
  }
}
