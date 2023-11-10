// src/chat-history/chat-detail.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity('chat_history')
export class MessageDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'chat_id' })
  chatId: number;

  @Column({ name: 'user_id', unsigned: true })
  userId: number;

  @Column({ name: 'is_admin', type: 'tinyint', default: 0 })
  isAdmin: number;

  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

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
