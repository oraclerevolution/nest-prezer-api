import { Module } from '@nestjs/common';
import { OrderProductsController } from './order-products.controller';
import { OrderProductsService } from './order-products.service';

@Module({
  controllers: [OrderProductsController],
  providers: [OrderProductsService]
})
export class OrderProductsModule {}
