// src/shops/shop.entity.ts
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'shops',
})
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'shop_name' })
  shopName: string;

  @Column({ name: 'shop_slogan' })
  shopSlogan: string;

  @Column({ unique: true })
  email: string;

  @Column({unique: true})
  contact: string;

  @Column()
  description: string;

  @Column({ name: 'shop_owner' })
  shopOwner: number;

  @Column({ name: 'shop_manager_contact' })
  shopManagerContact: string;

  @Column({ name: 'shop_owner_contact' })
  shopOwnerContact: string;

  @Column({default:0})
  status: number;

  @Column()
  logo: string;

  @Column({ name: 'isValid', default: false })
  isValid: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
