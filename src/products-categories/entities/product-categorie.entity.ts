// src/products-category/product-category.entity.ts
import { Shop } from 'src/shops/entities/shop.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({
    name: 'product_categories',
})
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => Shop)
  shop: Shop;
}
