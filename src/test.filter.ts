import { Inject, ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

// @Catch(BadRequestException)
@Catch(HttpException)
export class TestFilter implements ExceptionFilter {
  @Inject(AppService)
  private service: AppService;
  catch(exception: HttpException, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const statusCode = exception.getStatus();
      const res = exception.getResponse() as { message: string[]};
      response.status(statusCode).json({
        statusCode,
        message: res?.message?.join ? res?.message?.join(',') : exception.message,
        xxx: 111,
        yyy: this.service.getHello()
      })
    } else if (host.getType() === 'ws') {
    } else if (host.getType() === 'rpc') {
    }
  }
}
