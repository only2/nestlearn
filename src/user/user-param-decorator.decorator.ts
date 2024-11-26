import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { request, Request } from 'express';

export const UserHeaderDecorator = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    console.log('UserHeaderDecorator', key, ctx)
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);
export const UserParamQueryDecorator = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    console.log('UserParamDecorator', key, ctx)
    return key ? request.query[key] : '';
  },
);