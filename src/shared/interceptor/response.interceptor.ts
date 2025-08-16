import { Reflector } from '@nestjs/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common'

import { RESPONSE_MESSAGE_KEY } from '../utils/response-message.decorator'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ??
      'Request successful'

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message,
        data,
      })),
    )
  }
}
