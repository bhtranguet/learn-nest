import { Inject, Injectable } from '@nestjs/common';
import { EnvConfig } from './interfaces/envConfig.interface';
import { CONFIG_OPTIONS } from './constants';
import { ConfigOptions } from './interfaces/config-options.interface';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  // property readonly nghĩa là sẽ không thể thay đổi giá trị của nó sau khi gán giá trị lần đầu.
  private readonly envConfig: EnvConfig;
  // sử dụng private in contructer params tự động tạo private property của class
  // TODO: thêm base.env chứa config chung cho production.env và development.env
  constructor(@Inject(CONFIG_OPTIONS) private options: ConfigOptions) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
