import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageEntity } from './entities/message.entity';
import { MessageDetailEntity } from './entities/messageDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, MessageDetailEntity])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
