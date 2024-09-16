import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { RedisModule } from '../cache/redis/redis.module';
import { APP_FILTER } from '@nestjs/core';
import {
  AllExceptionFilter,
  AppDataExceptionFilter,
  AppExceptionFilter,
  ValidationExceptionFilter,
} from '../core/filters';

@Module({
  imports: [DatabaseModule, RedisModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AppDataExceptionFilter,
    },
  ],
})
export class AppModule {}
