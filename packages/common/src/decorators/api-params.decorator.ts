import { REQUEST_QUERIES } from '@kauction/constant';
import { TRequestQuery } from '@kauction/types';
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

type ParamOption = {
  name: string;
  required: boolean;
  schema: object;
  example: string | number;
};

export function QrnetStandardApiQueries(...params: TRequestQuery[]) {
  const paramOptions = params
    .map((param) => {
      switch (param.toLowerCase()) {
        case REQUEST_QUERIES.PAGE:
          return {
            name: 'page',
            required: false,
            schema: { type: 'number' },
            example: 1,
          };
        case REQUEST_QUERIES.PAGE_SIZE:
          return {
            name: 'page_size',
            required: false,
            schema: { type: 'number' },
            example: 10,
          };
        case REQUEST_QUERIES.TYPE:
          return {
            name: 'type',
            required: false,
            schema: { type: 'string' },
            example: 'active',
          };
        case REQUEST_QUERIES.STATUS:
          return {
            name: 'status',
            required: false,
            schema: { type: 'string' },
            example: 'active',
          };
        default:
          return null;
      }
    })
    .filter((i) => i) as unknown as ParamOption[];

  return applyDecorators(...paramOptions.map((option) => ApiQuery(option)));
}
