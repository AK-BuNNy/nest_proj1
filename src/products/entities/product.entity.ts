import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  prod_id: number;

  @Column({ nullable: false })
  prod_name: string;

  @Column()
  prod_description: string;

  @Column({ nullable: false })
  prod_price: number;
}
