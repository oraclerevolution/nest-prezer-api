import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config"
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDBConfigService } from './config/postgres-config.service';
import { UserController } from './user/user.controller';
import { ShopsModule } from './shops/shops.module';
import { ProductsCategoriesModule } from './products-categories/products-categories.module';
import { ProductsModule } from './products/products.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { ProductColorsModule } from './product-colors/product-colors.module';
import { OrdersModule } from './orders/orders.module';
import { OrderProductsModule } from './order-products/order-products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: encodeURIComponent(process.env.TYPEORM_HOST),
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities:['dist/**/*.entity{.ts,.js}'],
      synchronize: true,

    }),
    UserModule,
    ShopsModule,
    ProductsCategoriesModule,
    ProductsModule,
    ProductImagesModule,
    ProductColorsModule,
    OrdersModule,
    OrderProductsModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
