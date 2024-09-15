import * as dotenv from 'dotenv';
dotenv.config();
import { DEFAUT_CONSTANT } from './default-env.constant';
import { parseStringToNumber } from '@kauction/common';

export const API_PORT: number = parseStringToNumber(
  process.env['API_PORT'],
  DEFAUT_CONSTANT.API_PORT
);
export const API_HOST: string =
  process.env['API_HOST'] || DEFAUT_CONSTANT.API_HOST;
export const API_PREFIX =
  process.env['API_PREFIX'] || DEFAUT_CONSTANT.API_PREFIX;
