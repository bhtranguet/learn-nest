import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigManualModule } from './config/config.module';
import { ExceptionModule } from './exception/exception.module';
import { GuardModule } from './guard/guard.module';
import { ConfigNestModule } from './config-nest/config-nest.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import databaseConfig from 'config/custom-configuration-files/database.config';
import loggingConfig from 'config/custom-configuration-files/logging.config';
import * as Joi from 'joi';
import { BullModule } from '@nestjs/bullmq';
import { AudioModule } from './audio/audio.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ExceptionModule,
    GuardModule,
    ConfigManualModule.register({ folder: './config' }),
    ConfigNestModule,
    // Mặc định non TS file sẽ không được build trong thư mục dist
    // Để cho config file như là yaml và env xuất hiện trong thư mục dist
    // Cú pháp là Glob Pattern
    // Config trong nest-cli.json mục assets
    ConfigModule.forRoot({
      // Mặc định env path là .evn
      // Custom env path dùng envFilePath
      envFilePath: [`config/${process.env.NODE_ENV || 'development'}.env`],
      // isGlobal để chỉ cần import trong AppModule là có thể sử dụng ở các module khác.
      isGlobal: true,
      // load để load từ custom files
      load: [databaseConfig, loggingConfig],
      validationSchema: Joi.object({
        // validate env variable
        NODE_ENV: Joi.string().valid('development', 'production').required(),
      }),
    }),
    PrismaModule,
    ArticlesModule,
    UsersModule,

    // Register queue config
    // Bull queue sử dụng redis
    // host và port từ redis server
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AudioModule,
    AuthModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
