import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
 
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpCtx = context.switchToHttp();
    const req = httpCtx.getRequest<Request>();
    console.log(
        `${req.method} NA ROTA ${req.url}`
    )


    return next.handle().pipe(
      tap((data) => {
        console.log('RESPONSE')
        console.log(data);
      }),
    );
  }
}
