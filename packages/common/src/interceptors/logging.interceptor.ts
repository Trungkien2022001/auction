import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const rawReq = context.switchToHttp().getRequest();
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `Api ${rawReq.method} ${rawReq.url} - ${Date.now() - now}ms`
          )
        )
      );
  }
}
