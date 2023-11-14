import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsDate } from 'class-validator';

export class MessageDetailDto {
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
}
