// src/products/product.entity.ts
import { ProductCategory } from 'src/products-categories/entities/product-categorie.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({
    name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => ProductCategory)
  category: ProductCategory;
}
