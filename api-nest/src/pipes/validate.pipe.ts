/* eslint-disable @typescript-eslint/ban-types */
// validate.pipe.ts
import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidatePipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => {
          const constraints = error.constraints;
          if (constraints) {
            return Object.values(constraints);
          }
          return null;
        })
        .filter(Boolean)
        .flat();

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Validation failed',
          messages: errorMessages,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
