import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';

import { AppModule } from './app/app.module';
import { API_PORT, API_PREFIX } from '@kauction/config';
import { ValidationError } from 'class-validator';
import {
  LoggingInterceptor,
  TransformInterceptor,
  TrimPipe,
} from '@kauction/common';

export async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);

  app.enableCors();
  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle('APP Service API')
    .setDescription('APP Service API Doccument')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`API_PREFIX/docs`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return errors[0];
      },
    })
  );

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor()
  );

  app.useGlobalPipes(new TrimPipe());

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.setGlobalPrefix(API_PREFIX);
  await app.listen(API_PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${API_PORT}/${API_PREFIX}`
  );
}
