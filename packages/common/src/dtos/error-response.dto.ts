import { ApiProperty } from '@nestjs/swagger';

export class BaseErrorResponseDto {
  @ApiProperty({
    type: String,
    description: 'Status!',
    example: 'error',
  })
  status!: string;

  @ApiProperty({
    type: String,
    description: 'Error Cdoe!',
    example: 'CODE',
  })
  code!: string;

  @ApiProperty({
    type: String,
    description: 'Error message',
    example: 'ERROR_MESSAGE.',
  })
  message!: string;
}

export class UnauthorizedResponseDto {
  @ApiProperty({
    type: String,
    description: 'Status!',
    example: 'error',
  })
  status!: string;

  @ApiProperty({
    type: String,
    description:
      'Unauthorized. Make sure you set unauthorized token in header!',
    example: 'USER_NOT_AUTHENTICATED',
  })
  code!: string;

  @ApiProperty({
    type: String,
    description: 'Error message',
    example: 'Not authenticated.',
  })
  message!: string;
}

export class ForbiddenResponseDto {
  @ApiProperty({
    type: String,
    description: 'Status!',
    example: 'error',
  })
  status!: string;

  @ApiProperty({
    type: String,
    description:
      'Unauthorized. Make sure you set unauthorized token in header!',
    example: 'FORBIDDEN_TO_ACCESS',
  })
  code!: string;

  @ApiProperty({
    type: String,
    description: 'Error message',
    example: 'You don’t have permission to access.',
  })
  message!: string;
}

export class BadRequestResponseDto {
  @ApiProperty({
    type: String,
    description: 'Status!',
    example: 'error',
  })
  status!: string;

  @ApiProperty({
    type: String,
    description: 'Bad Request!',
    example: 'BAD_REQUEST',
  })
  code!: string;

  @ApiProperty({
    type: String,
    description: 'Error message',
    example: 'You don’t have permission to access.',
  })
  message!: string;
}

export class InternalServerErrorlResponseDto {
  @ApiProperty({
    type: String,
    description: 'Status!',
    example: 'error',
  })
  status!: string;

  @ApiProperty({
    type: String,
    description:
      'Unauthorized. Make sure you set unauthorized token in header!',
    example: 'INTERNAL_SERVER_ERROR',
  })
  code!: string;

  @ApiProperty({
    type: String,
    description: 'Error message',
    example: 'Unexpected error occurred!',
  })
  message!: string;
}
