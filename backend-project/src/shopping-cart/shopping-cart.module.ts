// shopping-cart.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartController } from './controllers/shopping-cart.controller';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCart, ShoppingCartSchema } from './schemas/shopping-cart.schema';
import { ShoppingCartRepository } from './repositories/shopping-cart.repository';
import { CatalogModule } from '../catalog/catalog.module';
import { FindShoppingCartUseCase } from './use-cases/find-shopping-cart.usecase';
import { ManageShoppingCartUseCase } from './use-cases/manage-shopping-cart.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }]),
    CatalogModule,
  ],
  controllers: [ShoppingCartController],
  providers: [
    ShoppingCartService,
    ShoppingCartRepository,
    FindShoppingCartUseCase,
    ManageShoppingCartUseCase

  ],
  exports: [
    ShoppingCartService,
    ShoppingCartRepository,
    FindShoppingCartUseCase,
    ManageShoppingCartUseCase
  ],
})
export class ShoppingCartModule {}
