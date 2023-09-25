// src/order-products/order-products.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/orders.entity';

@Entity({
    name: 'order_products',
})
export class OrderProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Order)
  order: Order;
}
