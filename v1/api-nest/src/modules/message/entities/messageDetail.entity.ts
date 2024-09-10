// src/chat-history/chat-detail.entity.ts

import {
  Entity,
  Column,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MessageEntity } from './message.entity';
import { AbstractEntity } from 'src/common/abstract.entity';
import { MessageDetailDto } from '../dto/message-detail.dto';
import { UseDto } from 'src/decorators/use-dto.decorator';

@Entity('chat_history')
@UseDto(MessageDetailDto)
export class MessageDetailEntity extends AbstractEntity<MessageDetailDto> {
  @Column({ name: 'chat_id' })
  chatId: number;

  @Column({ name: 'user_id', unsigned: true })
  userId: number;

  @Column({ name: 'is_admin', type: 'tinyint', default: 0 })
  isAdmin: number;

  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  //   @ManyToOne(() => MessageEntity, { cascade: true })
  //   @JoinColumn({ name: 'chat_id' })
  //   message: MessageEntity;

  @ManyToOne(() => MessageEntity, (message) => message.messageDetails, {
    cascade: true,
  })
  @JoinColumn({ name: 'chat_id' })
  message: MessageEntity;

  // @ManyToOne(() => User, { cascade: true })
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  // Add other necessary decorators for relationships or validations
}
