import { AppService } from './app.service';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class LogMiddleware implements NestMiddleware {
  @Inject(AppService)
  private readonly appService: AppService;
  use(req: Request, res: Response, next: () => void) {
    console.log('LogMiddleware =>>>>> before', req.url);
    console.log('-------' + this.appService.getHello());
    next();
    console.log('LogMiddleware =>>>>> after', req.url);
  }
}
