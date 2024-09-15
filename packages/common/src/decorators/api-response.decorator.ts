// eslint-disable-next-line @nx/enforce-module-boundaries
import { TCustomError } from '@kauction/types';
import { applyDecorators } from '@nestjs/common';
import { QrnetErrorsSwagger } from '../helpers/swaggers';

export function CustomAPIErrorResponse(types: TCustomError[]) {
  let decorators: any;
  if (types.length) {
    decorators = types.map((key) => QrnetErrorsSwagger[key]).filter((d) => d);
    return applyDecorators(...decorators);
  } else {
    return applyDecorators();
  }
}
