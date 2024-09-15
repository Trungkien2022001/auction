/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { API_PORT, API_PREFIX } from '@kauction/config';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_PREFIX);
  await app.listen(API_PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${API_PORT}/${API_PREFIX}`
  );
}
