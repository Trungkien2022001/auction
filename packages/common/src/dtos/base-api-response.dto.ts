import { ApiProperty } from '@nestjs/swagger';

export class BaseAPIResponseDTO<T> {
  @ApiProperty({
    type: String,
    description: 'Status!',
    example: 'success',
  })
  status!: string;

  @ApiProperty({
    type: String,
    description: 'Message!',
    example: 'Success',
  })
  message!: string;

  @ApiProperty({
    type: Object,
    description: 'Message!',
  })
  data!: T;
}
