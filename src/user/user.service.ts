import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt"
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserAuth, UserType } from './enums/user-type.enum';
import { Shop } from 'src/shops/entities/shop.entity';
import { ShopsService } from 'src/shops/shops.service';
import { v4 as uuidv4 } from 'uuid';
import { createShopOwnerDto } from 'src/shops/dto/create-shop-owner.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly shopService: ShopsService
    ) {}
    async register(userData: UserSubscribeDto): Promise<User>{
        const user = this.userRepository.create({
            ...userData
        })
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, user.salt)
        try {
            await this.userRepository.save(user)
        } catch (error) {
            console.log("Une erreur s'est produite lors de l'inscription", error)
        }

        delete user.salt
        delete user.password

        return user
    }

    async login(credentials: UserLoginDto): Promise<UserAuth>{
        const {email, password} = credentials
        //on verifie que le user existe
        const user = await this.userRepository.createQueryBuilder('user')
        .where('user.email = :email or user.contact = :email', {email}).getOne();
        //si on ne trouve pas le user
        if(!user){
            throw new NotFoundException('Connexion impossible, vérifiez vos identifiants')
        }

        const hashedPassword = await bcrypt.hash(password, user.salt)
        if(hashedPassword === user.password){
            const payload = {
                email: user.email,
                contact:user.contact,
                type: user.type
            }
            const token = this.jwtService.sign(payload)
            delete user.salt
            delete user.password
            if(user.type === UserType.ANONYMOUS){
                return {
                    access_token: token,
                    user
                }
            }else if(user.type === UserType.USER){
                const shop = await this.shopService.getShopById(user.id)
                return {
                    access_token: token,
                    user,
                    shop
                }
            }
        }else{
            throw new NotFoundException('Connexion impossible, vérifiez vos identifiants')
        }
    }
}
