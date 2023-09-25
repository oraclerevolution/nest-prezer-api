// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserType } from '../enums/user-type.enum';

@Entity({
    name:'users'
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  contact: string;

  @Column({nullable: true})
  password: string;

  @Column({nullable: true})
  salt: string

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.ADMIN
  })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}