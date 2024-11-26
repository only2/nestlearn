import { IsInt, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsInt()
  age: number;
  sex: string;
  hobbies: Array<string>;
}
