import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsDate } from 'class-validator';
import { MessageDetailEntity } from '../entities/messageDetail.entity';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { toBoolean } from 'src/common/utils';

export class MessageDetailDto extends AbstractDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNumber()
  @ApiProperty()
  chatId: number;

  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsBoolean()
  @ApiProperty()
  isAdmin: boolean;

  @IsString()
  @ApiProperty()
  content: string;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  updatedAt: Date;

  constructor(messageDetail: MessageDetailEntity) {
    super(messageDetail);
    this.chatId = messageDetail.chatId;
    this.userId = messageDetail.userId;
    this.isAdmin = toBoolean(messageDetail.isAdmin);
    this.content = messageDetail.content;
  }
}
