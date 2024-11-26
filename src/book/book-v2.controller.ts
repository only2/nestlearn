import { Controller, Get, Post, Body, Patch, Param, Delete, HostParam, Req, Res, Next, HttpCode, Headers, Header, Redirect, Render, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller(
  {
    host: ':host.0.0.1',
    path: 'book',
    version: '2'
  }
)
export class BookV2Controller {
  constructor(private readonly bookService: BookService) {}

  @Post()
  createV2(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Get()
  findAllV2(@HostParam('host') host: string, @Req() req: Request) {
    console.log('HostParam =>>>> ', host);
    console.log('Req =>>>> ', req.hostname);
    console.log('Req =>>>> ', req.url);
    return `Book =>>> findAllV2 =>>>> ${this.bookService.findAll()}`;
  }

  @Get('/testRes')
  testReV2(@Res({ passthrough: true }) res: Response) {
    // res.end('testRes')
    return 'testRes';
  }
  @Get('/testNext')
  testNext1V2(@Next() next: NextFunction) {
    console.log('testNextHandler1 =>>>>>>>>>>.')
    next();
    return 'testNext';
  }
  @Get('/testNext')
  testNext2V2() {
    console.log('testNextHandler2 =>>>>>>>>>>.')
    return 'testNext';
  }
  @Get('/testHttpCode')
  @HttpCode(222)
  testHttpCodeV2() {
    return 'testHttpCode';
  }
  @Get('/testResponseHeader')
  @Header('name', 'li')
  testResponseHeaderV2() {
    return 'testResponseHeader';
  }
  @Get('/testRender')
  @Render('book')
  testRenderV2() {
    return { book: 'Harry Potter', price: '$20' };
  }
  @Get('/testRedirect')
  // @Redirect('https://www.baidu.com')
  @Redirect()
  // testRedirect() {
  //   return 'testRedirect';
  // }
  async testRedirectV2() {
    return {
      url: 'https://www.baidu.com',
      statusCode: 302,
    };
  }
  @Get(':id')
  findOneV2(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }
  @Patch(':id')
  updateV2(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }
  @Delete(':id')
  removeV2(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
