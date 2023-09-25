import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';
import { createShopDto } from './dto/create-shop.dto';
import { User } from 'src/user/entities/user.entity';
import { createShopOwnerDto } from './dto/create-shop-owner.dto';
import { UserType } from 'src/user/enums/user-type.enum';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ShopsService {
    constructor(
        @InjectRepository(Shop)
        private readonly shopRepository: Repository<Shop>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async createShop(shopData: createShopDto): Promise<any>{
        const shop = this.shopRepository.create({...shopData})
        const user: createShopOwnerDto = {
            email: shopData.email,
            contact: shopData.contact,
            type: UserType.USER
        }
        try {
            //on enregistre le user en première position
            const userCreated = await this.userRepository.save(user)
            //ensuite on cree la boutique
            
            if(userCreated){
                shop.shopOwner = userCreated.id
                await this.shopRepository.save(shop)
                return {
                    message:"Votre boutique a bien été créée",
                    status:200,
                    shop
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error("Une erreur s'est produite lors de la création de votre boutique")
        }
    }
    async getAllShops(): Promise<Shop[]>{
        return this.shopRepository.find()
    }

    async getShopById(id: number): Promise<Shop>{
        if(!id) throw new Error("L'identifiant de la boutique n'est pas valide") 
        const shop = await this.shopRepository.findOne({
            where: {
                shopOwner: id
            }
        })
        return shop
    }

    async generateUniquePassword(): Promise<string> {
        const uuid = uuidv4().replace(/-/g, '');
        const password = uuid.substr(0, 7);
        return password;
    }

    async validateShop(shopEmail: Partial<Shop>): Promise<Shop>{
        //on recupere la boutique
        const shop = await this.shopRepository.findOne({where: {email: shopEmail.email}})
        if(!shop) throw new Error("Cette boutique n'existe pas")
        //on recupere le user qui correspond a la boutique
        console.log("shop", shop);
        const user = await this.userRepository.findOne({where: {id: shop.shopOwner, type: UserType.USER}})
        if(!user) throw new Error("Ce user n'existe pas")
        try {
            const password = await this.generateUniquePassword()
            console.log("password", password);
            const salt = await bcrypt.genSalt()
            user.salt = salt
            user.password = await bcrypt.hash(password, salt)
            await this.userRepository.save(user)
            shop.isValid = true
            await this.shopRepository.save(shop)
            return shop
        } catch (error) {
            console.log(error);
        }
        return shop
    }
}
