// user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password_hash: string;

  @Column({ type: 'varchar', length: 50, nullable: false, default: 'user' })
  role_id: string;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  avatar: string;

  @Column({ type: 'datetime', nullable: true })
  birthday: Date;

  @Column({ type: 'bigint', nullable: false, default: 0 })
  amount: bigint;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  refresh_token: string;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  prestige: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  is_verified: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  is_blocked: number;

  @Column({ type: 'float', nullable: false, default: 0 })
  rating: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  sell_failed_count_by_seller: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  sell_failed_count_by_auctioneer: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  sell_success_count: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  buy_cancel_count_by_seller: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  buy_cancel_count_by_auctioneer: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  buy_success_count: number;

  @Column({ type: 'json', nullable: true })
  custom_config: any;

  @CreateDateColumn({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  del_flag: number;

  @ManyToOne(() => RoleEntity, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
