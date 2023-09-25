import { Shop } from "src/shops/entities/shop.entity";
import { User } from "../entities/user.entity";

export enum UserType {
    ADMIN = 'admin',
    USER = 'user',
    ANONYMOUS = 'anonymous' 
}

export interface UserAuth {
    access_token: string,
    user: Partial<User>,
    shop?: Partial<Shop>
}