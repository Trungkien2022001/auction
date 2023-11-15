// src/chats/chat.entity.ts

import {
  Entity,
  Column,
  OneToMany,
  //   ManyToOne,
  //   JoinColumn,
} from 'typeorm';
import { MessageDetailEntity } from './messageDetail.entity';
import { AbstractEntity } from 'src/common/abstract.entity';
import { MessageDto } from '../dto/message.dto';
import { UseDto } from 'src/decorators/use-dto.decorator';
//   import { User } from '../users/user.entity';

@Entity('chat')
@UseDto(MessageDto)
export class MessageEntity extends AbstractEntity<MessageDto> {
  @Column({ name: 'user1', unsigned: true })
  user1: number;

  @Column({ name: 'user2', unsigned: true })
  user2: number;

  @Column({
    name: 'last_msg',
    type: 'text',
    charset: 'utf8mb4',
    collation: 'utf8mb4_0900_ai_ci',
  })
  lastMsg: string;

  @Column({ name: 'last_message_by', type: 'text' })
  lastMessageBy: string;

  @Column({ name: 'is_read', default: 0 })
  isRead: number;

  @OneToMany(
    () => MessageDetailEntity,
    (messageDetail) => messageDetail.message,
  )
  messageDetails: MessageDetailEntity[];
  // @ManyToOne(() => User, { cascade: true })
  // @JoinColumn({ name: 'user1' })
  // user1Details: User;

  // Add other necessary decorators for relationships or validations
}
