// src/chats/chat.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  //   ManyToOne,
  //   JoinColumn,
} from 'typeorm';
import { MessageDetailEntity } from './messageDetail.entity';
//   import { User } from '../users/user.entity';

@Entity('chat')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

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
