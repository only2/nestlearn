import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookService } from './book/book.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { LogMiddleware } from './log.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';
import { UnloginFilter } from './unlogin.filter';
import { MyDynamicModule } from './dynamic/dynamic.module';

@Module({
  imports: [UserModule, BookModule, MyDynamicModule.register({name: 'MyDynamicModule'})],
  controllers: [AppController],
  providers: [
    AppService,
    BookService,
    UserService,
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeInterceptor
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidatePipe
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: TestFilter
    // },
    {
      provide: APP_FILTER,
      useClass: UnloginFilter
    },
    {
      provide: 'testUser',
      useValue: {
        name: 'aaa',
        age: 20
      }
    },
    {
      provide: 'testUser2',
      useFactory() {
        return {
          name: 'bbb',
          desc: 'cccc1'
        }
      }
    },
    {
      provide: 'testUser3',
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello()
        }
      },
      inject: ['testUser', AppService]
    },
    {
      provide: 'testUser4',
      useExisting: 'testUser4-copy',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        return {
          name: 'ccc',
          desc: 'cccc2'
        }
      },
    },
    {
      provide: 'add_user_validation_options',
      useFactory() {
        return {
          aaa: 1,
          bbb: 2
        }
      }
    }
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LogMiddleware).forRoutes('*');
    consumer.apply(LogMiddleware).forRoutes('api/user*');
  }
}
