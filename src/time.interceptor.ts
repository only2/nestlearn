import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AppService } from './app.service';
@Injectable()
export class TimeInterceptor implements NestInterceptor {
  constructor(private appService: AppService) {}
  private readonly logger = new Logger(TimeInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('TimeInterceptor =>>>>>', context.getClass(), context.getHandler())
    const startTime = Date.now();
    return next.handle().pipe(
      tap((data) => {
        // 这里是更新缓存的操作，这里模拟下
        this.appService.getHello();
        this.logger.log(`log something`, data);
        console.log('time: ', Date.now() - startTime)
      })
    );
    // return next.handle();
  }
}
