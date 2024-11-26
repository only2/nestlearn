import { SetMetadata } from '@nestjs/common';

export const UserDecorator = (...args: string[]) => SetMetadata('roles', args);
