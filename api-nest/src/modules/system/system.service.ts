import { Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';

@Injectable()
export class SystemService {
  create(createSystemDto: CreateSystemDto) {
    return 'This action adds a new system';
  }

  findAll() {
    return `This action returns all system`;
  }

  findOne(id: number) {
    return `This action returns a #${id} system`;
  }

  update(id: number, updateSystemDto: UpdateSystemDto) {
    return `This action updates a #${id} system`;
  }

  remove(id: number) {
    return `This action removes a #${id} system`;
  }
}
