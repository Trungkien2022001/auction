import {
  IsNumber,
  IsString,
  IsBoolean,
  IsDate,
  ValidateNested,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MessageDetailDto } from './message-detail.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
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
  @ApiProperty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MessageDetailDto)
  messageDetails: MessageDetailDto;
}
