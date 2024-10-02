import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { successToHttpResponse } from './success-response.dto';
import { errorToHttpResponse } from './error-response.dto';
import { ResponseToGateWayType } from './global.type';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept<T>(context: ExecutionContext, next: CallHandler): Observable<ResponseToGateWayType<T>> {
    const handlerName = `API - ${context.getHandler().name}`;
    const method = context.switchToHttp().getRequest().method;
    let message = '';

    // Set success messages based on HTTP method
    if (method === 'GET') {
      message = 'Load Success';
    } else if (method === 'POST') {
      message = 'Save Success';
    } else if (method === 'PUT') {
      message = 'Update Success';
    } else if (method === 'DELETE') {
      message = 'Delete Success';
    }

    return next.handle().pipe(
      map((result) => {
        return successToHttpResponse<T>(result, handlerName, message);
      }),
      catchError((error) => {
        const errorResponse = errorToHttpResponse<T>(error, error.status);
        const transformedError = new HttpException(errorResponse, errorResponse.code);
        return throwError(() => transformedError);
      }),
    );
  }
}
