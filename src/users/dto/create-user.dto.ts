import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  phone: number;
}
