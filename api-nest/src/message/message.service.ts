import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageEntity } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    return this.messageRepository.find();
  }

  findAll() {
    return this.messageRepository.find({ relations: ['messageDetails'] });
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where:{
        id,
      },
      relations: ['messageDetails']
    })
    return message;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
