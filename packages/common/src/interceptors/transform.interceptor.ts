import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    response.status(HttpStatus.OK);
    return next.handle().pipe(
      map((data) => {
        const status = data?.responseStatus || 'success';
        const error = data?.responseError;
        const message = data?.responseMessage || 'Success';
        const type = data?.responseType;
        if (data != null && typeof data === 'object') {
          delete data.responseStatus;
          delete data.responseMessage;
          delete data.responseError;
          delete data.responseType;
        }
        return {
          status,
          error,
          message,
          data,
          type,
        };
      })
    );
  }
}
