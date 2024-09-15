import { EStandardError } from '@kauction/enums';

export type TStandardError =
  | EStandardError.BAD_REQUEST
  | EStandardError.UNAUTHORIZED
  | EStandardError.FORBIDDEN
  | EStandardError.NOT_FOUND
  | EStandardError.METHOD_NOT_ALLOWED
  | EStandardError.NOT_ACCEPTABLE
  | EStandardError.REQUEST_TIMEOUT
  | EStandardError.CONFLICT
  | EStandardError.GONE
  | EStandardError.LENGTH_REQUIRED
  | EStandardError.PRECONDITION_FAILED
  | EStandardError.PAYLOAD_TOO_LARGE
  | EStandardError.URI_TOO_LONG
  | EStandardError.UNSUPPORTED_MEDIA_TYPE
  | EStandardError.EXPECTATION_FAILED
  | EStandardError.I_AM_A_TEAPOT
  | EStandardError.UPGRADE_REQUIRED
  | EStandardError.PRECONDITION_REQUIRED
  | EStandardError.TOO_MANY_REQUESTS
  | EStandardError.REQUEST_HEADER_FIELDS_TOO_LARGE
  | EStandardError.INTERNAL_SERVER_ERROR
  | EStandardError.NOT_IMPLEMENTED
  | EStandardError.BAD_GATEWAY
  | EStandardError.SERVICE_UNAVAILABLE
  | EStandardError.GATEWAY_TIMEOUT
  | EStandardError.HTTP_VERSION_NOT_SUPPORTED;
