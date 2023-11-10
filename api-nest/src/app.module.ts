import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MessageModule } from './message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { MessageEntity } from './message/entities/message.entity';
import { MessageDetailEntity } from './message/entities/messageDetail.entity';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
