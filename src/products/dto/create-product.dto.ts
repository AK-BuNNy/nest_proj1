import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  prod_name: string;

  @IsString()
  prod_description: string;

  @IsNumber()
  prod_price: number;
}
