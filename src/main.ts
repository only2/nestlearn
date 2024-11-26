import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NextFunction, Request, Response } from 'express'
import * as session from 'express-session'
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe'
import { TestFilter } from './test.filter';
import { UnloginFilter } from './unlogin.filter';
import { VersioningType } from '@nestjs/common';

// 异步函数，用于启动应用
async function bootstrap() {
  // 创建Nest应用实例
  // const app = await NestFactory.create(AppModule);
  // 指定应用为Express应用类型
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(session({
    secret: 'li',
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  }))
  // 配置静态资源
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.enableVersioning({
  //   // type: VersioningType.HEADER,
  //   // header: 'version'
  //   type: VersioningType.MEDIA_TYPE,
  //   key: 'vv='
  // })
  app.setViewEngine('hbs');
  // 添加全局请求日志
  app.use(function(req: Request, res: Response, next: NextFunction) {
    console.log('before =>>>> Request', req.url);
    next();
    console.log('after =>>>> Request');
  })
  // 全局应用守卫
  // app.useGlobalGuards(new LoginGuard())
  // 全局拦截器
  // app.useGlobalInterceptors(new TimeInterceptor())
  // 全局参数校验&&转换
  // app.useGlobalPipes(new ValidatePipe())
  // 全局错误拦截器
  // app.useGlobalFilters(new TestFilter())
  // app.useGlobalFilters(new UnloginFilter())
  // 启动应用，监听3000端口
  await app.listen(3000);
  // setTimeout(() => {
  //   app.close()
  // }, 3000);
}
bootstrap();
