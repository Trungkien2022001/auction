import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

interface IsUTCTimeStringOptions {
  description?: string;
  example?: string;
  require?: boolean;
}

export function IsUTCTimeString(description?: string) {
  return applyDecorators(
    Matches(
      /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
    ),
    ApiProperty({
      required: true,
      type: String,
      description,
      example: '2001-02-20 05:30:00',
      nullable: false,
      default: '2001-02-20 05:30:00',
    })
  );
}
