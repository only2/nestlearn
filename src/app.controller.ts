import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('testUser') private readonly testUser: {name: string, age: number},
    @Inject('testUser2') private readonly testUser2: {name: string, desc: string},
    @Inject('testUser3') private readonly testUser3: {name: string, desc: string},
    @Inject('testUser4') private readonly testUser4: {name: string, desc: string}
  ) {}

  @Get()
  @UseGuards(LoginGuard)
  getHello(): string {
    // console.log(this.testUser);
    // console.log(this.testUser2);
    // console.log(this.testUser3);
    // console.log(this.testUser4);
    console.log('app controller =>>>>>> getHello()')
    return this.appService.getHello();
  }
}
