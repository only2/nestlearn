import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { UserDecorator } from './user-decorator.decorator';
import { LoginGuard } from 'src/login.guard';

export function UserDecorators(path: string, role: string) {
  return applyDecorators(
    Get(path),
    UserDecorator(role),
    UseGuards(LoginGuard)
  )
}