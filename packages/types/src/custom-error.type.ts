import { ERROR } from '@kauction/constant';

// export type TCustomError = typeof ERROR[keyof typeof ERROR]
export type TCustomError = keyof typeof ERROR;
