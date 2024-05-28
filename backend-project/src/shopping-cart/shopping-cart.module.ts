import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart, ShoppingCartSchema } from './schemas/shopping-cart.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }])],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [ShoppingCartService, MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }])],
})
export class ShoppingCartModule {}
