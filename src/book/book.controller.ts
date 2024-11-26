import { Controller, Get, Post, Body, Patch, Param, Delete, HostParam, Req, Res, Next, HttpCode, Headers, Header, Redirect, Render, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller(
  {
    host: ':host.0.0.1',
    path: 'book',
    version: VERSION_NEUTRAL
  }
)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Version('2')
  @Get()
  findAllV2(@HostParam('host') host: string, @Req() req: Request) {
    console.log('HostParam =>>>> ', host);
    console.log('Req =>>>> ', req.hostname);
    console.log('Req =>>>> ', req.url);
    return `Book =>>> findAllV2 =>>>> ${this.bookService.findAll()}`;
  }

  @Get()
  findAll(@HostParam('host') host: string, @Req() req: Request) {
    console.log('HostParam =>>>> ', host);
    console.log('Req =>>>> ', req.hostname);
    console.log('Req =>>>> ', req.url);
    return this.bookService.findAll();
  }
  @Get('/testRes')
  testRes(@Res({ passthrough: true }) res: Response) {
    // res.end('testRes')
    return 'testRes';
  }
  @Get('/testNext')
  testNext1(@Next() next: NextFunction) {
    console.log('testNextHandler1 =>>>>>>>>>>.')
    next();
    return 'testNext';
  }
  @Get('/testNext')
  testNext2() {
    console.log('testNextHandler2 =>>>>>>>>>>.')
    return 'testNext';
  }
  @Get('/testHttpCode')
  @HttpCode(222)
  testHttpCode() {
    return 'testHttpCode';
  }
  @Get('/testResponseHeader')
  @Header('name', 'li')
  testResponseHeader() {
    return 'testResponseHeader';
  }
  @Get('/testRender')
  @Render('book')
  testRender() {
    return { book: 'Harry Potter', price: '$20' };
  }
  @Get('/testRedirect')
  // @Redirect('https://www.baidu.com')
  @Redirect()
  // testRedirect() {
  //   return 'testRedirect';
  // }
  async testRedirect() {
    return {
      url: 'https://www.baidu.com',
      statusCode: 302,
    };
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
