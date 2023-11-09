import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [NotificationModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
