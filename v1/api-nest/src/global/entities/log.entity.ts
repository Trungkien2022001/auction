import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('action_logs')
export class ActionLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  path: string;

  @Column({ length: 100, nullable: false })
  matched_route: string;

  @Column({ length: 50, nullable: false })
  client_ip: string;

  @Column({ length: 200, nullable: false })
  user: string;

  @Column({ length: 10, nullable: false })
  method: string;

  @Column({ default: 200 })
  status: number;

  @Column({ type: 'longtext', nullable: true })
  request: string;

  @Column({ type: 'longtext', nullable: true })
  response: string;

  // Add other fields as needed

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
