import {
  IsNumber,
  IsString,
  IsBoolean,
  IsDate,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { MessageDetailDto } from './message-detail.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from '../entities/message.entity';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { toBoolean } from 'src/common/utils';
import { MessageDetailEntity } from '../entities/messageDetail.entity';

export class MessageDto extends AbstractDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNumber()
  @ApiProperty()
  user1: number;

  @IsNumber()
  @ApiProperty()
  user2: number;

  @IsString()
  @ApiProperty()
  lastMsg: string;

  @IsString()
  @ApiProperty()
  lastMessageBy: string;

  @IsBoolean()
  @ApiProperty()
  isRead: boolean;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  updatedAt: Date;

  @IsArray()
  @ApiProperty({ type: MessageDetailDto, isArray: true })
  @ValidateNested({ each: true })
  messageDetails: MessageDetailDto[];

  constructor(message: MessageEntity) {
    super(message);
    this.user1 = message.user1;
    this.user2 = message.user2;
    this.lastMsg = message.lastMsg;
    this.lastMessageBy = message.lastMessageBy;
    this.isRead = toBoolean(message.isRead);
    this.messageDetails = message.messageDetails.map(
      (messageDetail: MessageDetailEntity) => messageDetail.toDto(),
    );
  }
}
