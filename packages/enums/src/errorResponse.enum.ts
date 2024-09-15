export enum EStandardError {
  BAD_REQUEST = 'Bad Request', // 400
  UNAUTHORIZED = 'Unauthorized', // 401
  FORBIDDEN = 'Forbidden', // 403
  NOT_FOUND = 'Not Found', // 404
  METHOD_NOT_ALLOWED = 'Method Not Allowed', // 405
  NOT_ACCEPTABLE = 'Not Acceptable', // 406
  REQUEST_TIMEOUT = 'Request Timeout', // 408
  CONFLICT = 'Conflict', // 409
  GONE = 'Gone', // 410
  LENGTH_REQUIRED = 'Length Required', // 411
  PRECONDITION_FAILED = 'Precondition Failed', // 412
  PAYLOAD_TOO_LARGE = 'Payload Too Large', // 413
  URI_TOO_LONG = 'URI Too Long', // 414
  UNSUPPORTED_MEDIA_TYPE = 'Unsupported Media Type', // 415
  EXPECTATION_FAILED = 'Expectation Failed', // 417
  I_AM_A_TEAPOT = 'I’m a teapot', // 418 (RFC 2324)
  UPGRADE_REQUIRED = 'Upgrade Required', // 426
  PRECONDITION_REQUIRED = 'Precondition Required', // 428
  TOO_MANY_REQUESTS = 'Too Many Requests', // 429
  REQUEST_HEADER_FIELDS_TOO_LARGE = 'Request Header Fields Too Large', // 431
  INTERNAL_SERVER_ERROR = 'Internal Server Error', // 500
  NOT_IMPLEMENTED = 'Not Implemented', // 501
  BAD_GATEWAY = 'Bad Gateway', // 502
  SERVICE_UNAVAILABLE = 'Service Unavailable', // 503
  GATEWAY_TIMEOUT = 'Gateway Timeout', // 504
  HTTP_VERSION_NOT_SUPPORTED = 'HTTP Version Not Supported', // 505
}
