import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as i18n from 'i18n';
import { ERROR } from '@kauction/constant';
import { EStandardError } from '@kauction/enums';
import { ActionLogsRepo } from '../repositories';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly actionLogsRepo: ActionLogsRepo) {}

  catch(exception: Error | HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const now = Date.now();
    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : null;

    let language = 'vi';
    if (request.headers['accept-language'] === 'en') {
      language = 'en';
    }

    Logger.error(
      `Api ${request.method} ${request.url} - ${Date.now() - now}ms 
            ERROR_CODE: ${exception.code}
            ${exception.stack}`
    );
    Logger.error(request.body);

    this.actionLogsRepo.insert({
      client_ip: request.ip,
      path: request.url,
      matched_route: request.originalUrl,
      user: request.user ? JSON.stringify(request.user) : 'Anonymous',
      method: request.method,
      status: response.statusCode || 200,
      request: JSON.stringify({
        body: request.body,
        params: request.params,
      }),
      header: JSON.stringify(request.headers),
      error: exception.stack,
      error_code: exception.code || EStandardError.INTERNAL_SERVER_ERROR,
    });

    if (httpStatus === 401) {
      return response.status(HttpStatus.UNAUTHORIZED).send({
        status: 'error',
        code: ERROR.USER_NOT_AUTHENTICATED,
        message: i18n.__({
          phrase: ERROR.USER_NOT_AUTHENTICATED,
          locale: language,
        }),
      });
    }

    if (httpStatus === 403) {
      return response.status(HttpStatus.FORBIDDEN).send({
        status: 'error',
        code: ERROR.FORBIDDEN_TO_ACCESS,
        message: i18n.__({
          phrase: ERROR.FORBIDDEN_TO_ACCESS,
          locale: language,
        }),
      });
    }

    response.status(HttpStatus.OK).send({
      status: 'error',
      code: httpStatus === 404 ? ERROR.NOT_FOUND : ERROR.SERVER_ERROR,
      message: i18n.__({
        phrase: httpStatus === 404 ? ERROR.NOT_FOUND : ERROR.SERVER_ERROR,
        locale: language,
      }),
    });
  }
}
