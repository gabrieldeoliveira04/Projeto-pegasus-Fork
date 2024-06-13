// shopping-cart.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartController } from './controllers/shopping-cart.controller';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCart, ShoppingCartSchema } from './schemas/shopping-cart.schema';
import { ShoppingCartRepository } from './repositories/shopping-cart.repository';
import { CatalogModule } from '../catalog/catalog.module'; // Importe o módulo do catálogo
import { CreateShoppingCartUseCase } from './use-cases/create-shopping-cart.usecase';
import { GetAllShoppingCartsUseCase } from './use-cases/get-all-shopping-carts.usecase';
import { GetShoppingCartByIdUseCase } from './use-cases/get-shopping-cart-by-id.usecase';
import { UpdateShoppingCartUseCase } from './use-cases/update-shopping-cart.usecase';
import { DeleteShoppingCartUseCase } from './use-cases/delete-shopping-cart.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }]),
    CatalogModule, // Adicione o módulo do catálogo aqui
  ],
  controllers: [ShoppingCartController],
  providers: [
    ShoppingCartService,
    ShoppingCartRepository,
    CreateShoppingCartUseCase,
    GetAllShoppingCartsUseCase,
    GetShoppingCartByIdUseCase,
    UpdateShoppingCartUseCase,
    DeleteShoppingCartUseCase,
  ],
  exports: [
    ShoppingCartService,
    ShoppingCartRepository,
    CreateShoppingCartUseCase,
    GetAllShoppingCartsUseCase,
    GetShoppingCartByIdUseCase,
    UpdateShoppingCartUseCase,
    DeleteShoppingCartUseCase,
  ],
})
export class ShoppingCartModule {}
