import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Reflector } from '@nestjs/core';


@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector;
  @Inject(AppService)
  private appService: AppService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('LoginGuard =>>>>');
    const classMetaData = this.reflector.get(
      'roles',
      context.getClass(),
    );
    const methodMetaData = this.reflector.get(
      'roles',
      context.getHandler(),
    );
    console.log('classMetaData=>>>>>>>>>>', classMetaData)
    console.log('methodMetaData=>>>>>>>>>>', methodMetaData)
    console.log(this.appService.getHello());
    return true;
  }
}
