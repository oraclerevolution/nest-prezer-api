import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { createShopDto } from './dto/create-shop.dto';
import { Shop } from './entities/shop.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth-guard.guard';

@Controller('shops')
export class ShopsController {
    constructor(
        private readonly shopsService: ShopsService
    ){}

    @Post()
    createShop(
        @Body() shopData: createShopDto
    ): Promise<Shop>{
        return this.shopsService.createShop(shopData)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('all-shops')
    getAllShops(): Promise<Shop[]>{
        return this.shopsService.getAllShops()
    }

    @Post('validate-shop')
    validateShop(
        @Body() shopEmail: Partial<Shop>
    ): Promise<Shop>{
        if(!shopEmail) throw new Error("L'email de la boutique n'est pas valide")
        return this.shopsService.validateShop(shopEmail)
    }
}
