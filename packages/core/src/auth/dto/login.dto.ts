import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'trungkien07yd@gmail.com', description: 'Username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'trungkien', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
