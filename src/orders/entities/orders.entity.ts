// src/orders/order.entity.ts
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({
    name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_contact: string;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @Column()
  longitude: string;

  @Column()
  latitude: string;

  @Column()
  status: number;
}
