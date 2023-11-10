// role.entity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description: string;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  admin: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  user: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  auction: number;

  @Column({ type: 'tinyint', nullable: false, default: 1 })
  homepage: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  dashboard_auction: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  dashboard_config: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  dashboard_money: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  dashboard_hr: number;
}
