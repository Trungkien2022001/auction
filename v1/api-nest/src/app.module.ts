import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './modules/notification/notification.module';
import { MessageModule } from './modules/message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { ActionLoggingInterceptor } from './interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LogModule } from './modules/log/log.module';
import { SystemModule } from './modules/system/system.module';
import { AuctionModule } from './modules/auction/auction.module';
import { FinancialModule } from './modules/financial/financial.module';
import { CacheModule } from './cache/cache.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    NotificationModule,
    MessageModule,
    CacheModule,
    SocketModule,
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
    DashboardModule,
    LogModule,
    SystemModule,
    AuctionModule,
    FinancialModule,
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
