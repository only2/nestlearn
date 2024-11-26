import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query,
  UseInterceptors, UploadedFiles,
  OnModuleInit, OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
  UsePipes,
  UseFilters,
  ParseIntPipe,
  SetMetadata,
  UseGuards,
  Headers,
  Ip,
  Session,
  HttpStatus,
  HttpException,
  ParseFilePipe,
  ParseBoolPipe,
  ParseArrayPipe,
  ParseEnumPipe,
  DefaultValuePipe,
  ValidationPipe,
  Version
} from '@nestjs/common';
import { Ggg } from './user.enum';
import { ModuleRef } from '@nestjs/core';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { TimeInterceptor } from 'src/time.interceptor';
import { MapTestInterceptor } from 'src/map.interceptor';
import { CatchErrorTestInterceptor } from 'src/catch-error.interceptor';
import { TimeoutInterceptor } from 'src/timeout.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidatePipe } from 'src/validate.pipe';
import { AddUserValidationPipe } from './validationPipes/add-user.validation.pipe';
import { TestFilter } from 'src/test.filter';
import { LoginGuard } from 'src/login.guard';
import { UserDecorator } from './user-decorator.decorator';
import { UserHeaderDecorator, UserParamQueryDecorator } from './user-param-decorator.decorator';
import { UserDecorators } from './user-decorators.decorator';
import { UserClassDecorator } from './class-decorator.decorator';
import { UnLoginException, UnloginFilter } from 'src/unlogin.filter';

// @Controller('api/user')
@UserClassDecorator('api/user', 'roles', ['user', 'admin'])
// @UseInterceptors(TimeInterceptor)
// @UsePipes(ValidatePipe)
// @UseFilters(TestFilter)
// @SetMetadata('roles', ['user', 'admin'])
export class UserController implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
  constructor(private readonly userService: UserService, private readonly moduleRef: ModuleRef) {}
  onModuleInit() {
    console.log('UserController =>>>>> OnModuleInit')
  }
  onApplicationBootstrap() {
    console.log('UserController =>>>>> onApplicationBootstrap')
  }
  onModuleDestroy() {
    console.log('UserController =>>>>> onModuleDestroy')
  }
  beforeApplicationShutdown(signal: string) {
    console.log('UserController =>>>>> beforeApplicationShutdown', signal)
  }
  onApplicationShutdown() {
    const userService = this.moduleRef.get<UserService>(UserService)
    console.log('UserController =>>>>> userService', userService.findAll())
    console.log('UserController =>>>>> onApplicationShutdown')
  }

  @Post('addUser')
  @UseFilters(TestFilter)
  // @Body(AddUserValidationPipe)
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return `received: ${JSON.stringify(createUserDto)}`
    // return this.userService.create(createUserDto);
  }
  @Get('testUnloginFilter')
  // @UseFilters(UnloginFilter)
  testUnloginFilter(): never {
    throw new UnLoginException()
  }

  @Post('file')
  @UseInterceptors(AnyFilesInterceptor({
    dest: 'uploads/'
  }))
  addUserWithFiles(@Body() createUserDto: CreateUserDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return `received: ${JSON.stringify(createUserDto)}`
  }
  @Get('/testPipe/:aaa')
  @UseFilters(TestFilter)
  @UseGuards(LoginGuard)
  // @SetMetadata('roles', ['admin'])
  @UserDecorator('user')
  testPipe(
    @Headers('Accept') accept: string, @Headers() Headers: Record<string, any>, @Param('aaa', ParseIntPipe) aaa: Number, @Query('num', ValidatePipe) num: number
  ) {
    console.log('Accept=>>>>', accept)
    console.log('headers=>>>>', Headers)
    console.log('params=>>>> aaa', aaa)
    return num + 1;
  }
  @Get('/testParamsPipe')
  testParamsPipe(
    @Query('aa', ParseIntPipe) aa: number,
    @Query('bb', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST
    })) bb: number,
    @Query('cc', new ParseIntPipe({
      exceptionFactory: (msg) => {
        console.log('testParamsPipe paramsPipe error =>>>>>>>>', msg)
        throw new HttpException(`testParamsPipe paramsPipe error =>>>>> ${msg}`, HttpStatus.BAD_REQUEST)
      }
    })) cc: number,
    @Query('dd', ParseFilePipe) dd: number,
    @Query('ee', ParseBoolPipe) ee: boolean,
    @Query('ff', new ParseArrayPipe({
      items: Number
    })) ff: Array<number>,
    @Query('gg', new ParseEnumPipe(Ggg)) gg: Ggg,
    @Query('hh', new DefaultValuePipe('hh')) hh: string
  ): string {
    return `aa =>>> ${aa + 1} bb =>>> ${bb + 2} cc =>>> ${cc + 3} dd =>>> ${dd} ee =>>> ${ee} ff =>>> ${ff.reduce((pre, cur) => pre + cur, 0)} gg =>>> ${gg} hh =>>>> ${hh}`
  }
  @UserDecorators('/testUseUserDecorators', 'user')
  testUseUserDecorators () {
    return 'testUseUserDecorators';
  }
  @Get('/testUserHeaderDecorators')
  testUserHeaderDecorators (
    @Headers('Accept') result1: string,
    @UserHeaderDecorator('Accept') result2: string,
  ) {
    console.log('testUserHeaderDecorators result1=>>>>', result1)
    console.log('testUserHeaderDecorators result2=>>>>', result2)
    return `testUserHeaderDecorators result1=>>>>${result1}\ntestUserHeaderDecorators result2=>>>>${result2}`;
  }
  @Get('/testUserQueryDecorators')
  testUserQueryDecorators (
    @Query('name') name: string,
    @UserParamQueryDecorator('name') name1: string
  ) {
    return `testUserQueryDecorators @Query=>>>>${name}\ntestUserQueryDecorators @UserParamQueryDecorator=>>>>${name1}`;
  }
  @Get('/getIp')
  getIp(@Ip() ip: string) {
    console.log('ip=>>>>', ip)
    return `ip=>>>>${ip}}`;
  }
  @Get('/session')
  getSession(@Session() session) {
    console.log('session=>>>>', session)
    if (!session.count) {
      session.count = 0
    }
    session.count = session.count + 1
    return `session.count=>>>>${session.count}}`;
  }
  @Get('/testMapTestInterceptor')
  @UseInterceptors(MapTestInterceptor)
  testMapTestInterceptor() {
    return 'testMapTestInterceptor'
  }
  @Get('/testCatchErrorInterceptor')
  @UseInterceptors(CatchErrorTestInterceptor)
  testCatchErrorTestInterceptor() {
    throw new Error('error');
    return 'testCatchErrorTestInterceptor'
  }
  @Get('/testTimeoutInterceptor')
  @UseInterceptors(TimeoutInterceptor)
  async testTimeoutInterceptor() {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('testTimeoutInterceptor')
      }, 5000)
    })
    // return 'testTimeoutInterceptor'
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `received: id=${id}`;
    // return this.userService.findOne(+id);
  }

  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }

  @Version('2')
  @Get()
  findAllV2() {
    return `findAllV2${this.userService.findAll()}`;
  }
  @Get()
  @UseInterceptors(TimeInterceptor)
  findAll() {
    console.log(this.userService.findAll());
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
