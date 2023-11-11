import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MessageModule } from './message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Connection, DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { MessageEntity } from './message/entities/message.entity';
import { MessageDetailEntity } from './message/entities/messageDetail.entity';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { AuthModule } from './auth/auth.module';
import { ActionLoggingInterceptor } from './interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    NotificationModule,
    MessageModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'auction',
    //   entities: [MessageEntity, MessageDetailEntity],
    //   synchronize: false,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.mysqlConfig,
      inject: [ApiConfigService],
      // dataSourceFactory: (options) => {
      //   if (!options) {
      //     throw new Error('Invalid options passed');
      //   }

      //   return Promise.resolve(
      //     addTransactionalDataSource(new DataSource(options)),
      //   );
      // },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Connection, 
    {
      provide: APP_INTERCEPTOR,
      useClass: ActionLoggingInterceptor,
    },
  ],
})
export class AppModule {}
