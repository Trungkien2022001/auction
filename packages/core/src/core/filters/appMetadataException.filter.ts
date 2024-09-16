import { AppMetadataError } from '@kauction/common';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as i18n from 'i18n';
import { ActionLogsRepo } from '../repositories';

@Catch(AppMetadataError)
export class AppMetatadaExceptionFilter implements ExceptionFilter {
  constructor(private readonly actionLogsRepo: ActionLogsRepo) {}

  catch(exception: AppMetadataError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const now = Date.now();

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
      error_code: exception.code,
    });

    response.status(HttpStatus.OK).send({
      status: 'error',
      code: exception.code,
      message: i18n.__(
        {
          phrase: exception.code,
          locale: language,
        },
        exception.metadata
      ),
    });
  }
}
