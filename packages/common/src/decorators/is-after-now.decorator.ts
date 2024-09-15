import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import * as moment from 'moment';

export function IsAfterNow(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isAfterNow',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return moment(value, 'YYYY-MM-DD HH:mm:ss', true).isAfter(moment());
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a date and time after the current date and time.`;
        },
      },
    });
  };
}
