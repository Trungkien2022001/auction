import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import * as moment from 'moment';

export function IsAfterProperty(
  property: string,
  validationOptions?: ValidationOptions
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isAfterProperty',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (!value || !relatedValue) {
            return true;
          } // Ignore validation if value or relatedValue is empty
          return moment(value).isAfter(moment(relatedValue));
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} must be after ${relatedPropertyName}`;
        },
      },
    });
  };
}
