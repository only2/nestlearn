import { UserService } from './user/user.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  @Inject(UserService)
  private UserService:UserService;
  getHello(): string {
    return 'Hello World!' + this.UserService.findAll();
  }
}
