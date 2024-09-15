import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('action_logs_pkey', ['id'], { unique: true })
@Entity('action_logs')
export class ActionLogs {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id!: number;

  @Column('varchar', {
    name: 'path',
    length: 50,
    default: () => '',
  })
  path!: string;

  @Column('varchar', {
    name: 'matched_route',
    length: 50,
    default: () => '',
  })
  matched_route!: string;

  @Column('varchar', {
    name: 'client_ip',
    length: 50,
    default: () => "'0.0.0.0'",
  })
  client_ip!: string;

  @Column('varchar', {
    name: 'user',
    length: 1000,
    default: () => "'Anonymos'",
  })
  user!: string;

  @Column('varchar', {
    name: 'method',
    length: 10,
    default: () => '',
  })
  method!: string;

  @Column('int', {
    name: 'status',
    default: () => '200',
  })
  status!: number;

  @Column('text', {
    name: 'request',
    nullable: true,
  })
  request!: string | null;

  @Column('text', {
    name: 'header',
    nullable: true,
  })
  header!: string | null;

  @Column('text', {
    name: 'response',
    nullable: true,
  })
  response!: string | null;

  @Column('text', {
    name: 'error',
    nullable: true,
  })
  error!: string | null;

  @Column('varchar', {
    name: 'error_code',
    length: 10,
    default: () => '',
  })
  error_code!: string;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at!: Date;
}
