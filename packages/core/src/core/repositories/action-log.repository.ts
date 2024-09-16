import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActionLogs } from '../entities/collections';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActionLogsRepository extends Repository<ActionLogs> {
  constructor(
    @InjectRepository(ActionLogs)
    readonly repository: Repository<ActionLogs>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
