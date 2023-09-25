// src/product-images/product-images.entity.ts
import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity({
    name: 'product_images',
})
export class ProductImages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photo: string;

  @ManyToOne(() => Product)
  product: Product;
}
