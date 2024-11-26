import { Global, Module, forwardRef } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { UserModule } from 'src/user/user.module';
import { BookV2Controller } from './book-v2.controller';
// 全局模块
@Global()
@Module({
  imports: [
    forwardRef(() => UserModule)
  ],
  controllers: [BookV2Controller, BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
