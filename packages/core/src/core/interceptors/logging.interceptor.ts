// action-logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Connection } from 'typeorm';
import { ActionLogs } from '../entities/collections';
import { EStandardError } from '@kauction/enums';

@Injectable()
export class DatabaseLoggingInterceptor implements NestInterceptor {
  constructor(private readonly connection: Connection) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip, originalUrl } = request;

    return next.handle().pipe(
      tap((response) => {
        const actionLog = new ActionLogs();
        actionLog.path = url;
        actionLog.matched_route = originalUrl;
        actionLog.client_ip = ip;
        actionLog.user = request.user?.username || 'Anonymous'; // Adjust this based on your authentication logic
        actionLog.method = method;
        actionLog.header = JSON.stringify(request.headers);
        actionLog.status = response?.statusCode || 200;
        actionLog.request = JSON.stringify(request.body);
        actionLog.response = JSON.stringify(response);
        actionLog.error = response.stack;
        actionLog.error_code =
          response.code || EStandardError.INTERNAL_SERVER_ERROR;

        this.connection.getRepository(ActionLogs).save(actionLog);
      })
    );
  }
}
