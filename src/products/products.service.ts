import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from "./entities/product.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({where :{prod_id: id}});
    if(!product){
      return {
        message: `Product ID ${id} not found`,
        product,
      };
    }
    return product; 
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productToUpdate= await this.productRepository.findOne({ where: { prod_id: id } });
    if (!productToUpdate) {
      throw new Error(`Product with ID ${id} not found`);
    }
    if (updateProductDto.prod_name) {
      productToUpdate.prod_name = updateProductDto.prod_name;
    }

    if (updateProductDto.prod_description) {
      productToUpdate.prod_description = updateProductDto.prod_description;
    }
    if (updateProductDto.prod_price) {
      productToUpdate.prod_price = updateProductDto.prod_price;
    }
    try {
      const updatedProduct = await this.productRepository.save(productToUpdate);
      return {message: `Product Details updated sucessfully`, updatedProduct};
    } catch (error) {
      throw new Error(
        `Failed to update user with ID ${id}. Error: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
   const deleteProduct = await this.productRepository.delete(id);
   if(deleteProduct.affected === 0){
    return 'poduct not found'
   }
   return {message: `Product ${id} is deleted successfully`}
  }
}
