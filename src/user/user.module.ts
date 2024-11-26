import {
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
  forwardRef
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppService } from 'src/app.service';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    forwardRef(() => BookModule)
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AppService,
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
  exports: [UserService],
})
export class UserModule implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
  onModuleInit() {
    console.log('UserModule =>>>>> OnModuleInit')
  }
  onApplicationBootstrap() {
    console.log('UserModule =>>>>> onApplicationBootstrap')
  }
  onModuleDestroy() {
    console.log('UserModule =>>>>> onModuleDestroy')
  }
  beforeApplicationShutdown(signal: string) {
    console.log('UserModule =>>>>> beforeApplicationShutdown', signal)
  }
  onApplicationShutdown() {
    console.log('UserModule =>>>>> onApplicationShutdown')
  }
}
