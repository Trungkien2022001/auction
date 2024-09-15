import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'StringInArray', async: false })
export class StringInArray implements ValidatorConstraintInterface {
  validate(field: string, args: ValidationArguments) {
    return args.constraints.includes(field);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} does not match (${args.constraints.join(', ')})`;
  }
}
