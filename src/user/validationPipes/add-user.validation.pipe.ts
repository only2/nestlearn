import { PipeTransform, Inject, Injectable, ArgumentMetadata, BadRequestException, Optional } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AddUserValidationPipe implements PipeTransform<any> {
  @Optional()
  @Inject('add_user_validation_options')
  private addUserValidationOptions
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }
    console.log('addUserValidationOptions =>>>>>>>>>>', this.addUserValidationOptions)
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('参数验证失败');
    }
    return value;
  }
}