import {
  Inject,
  Injectable,
  forwardRef,
  OnApplicationBootstrap,
  OnModuleInit,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown
} from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
  // constructor(private bookService: BookService) {

  // }
  onModuleInit() {
    console.log('UserService =>>>>> OnModuleInit')
  }
  onApplicationBootstrap() {
    console.log('UserService =>>>>> onApplicationBootstrap')
  }
  onModuleDestroy() {
    console.log('UserService =>>>>> onModuleDestroy')
  }
  beforeApplicationShutdown(signal: string) {
    console.log('UserService =>>>>> beforeApplicationShutdown', signal)
  }
  onApplicationShutdown() {
    console.log('UserService =>>>>> onApplicationShutdown')
  }
  @Inject(forwardRef(() => BookService))
  private BookService:BookService;
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user` + this.BookService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
