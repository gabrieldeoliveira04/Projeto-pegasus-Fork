import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogService } from './catalog/catalog.service';
import { CatalogModule } from './catalog/catalog.module';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { TransactionService } from './transaction/transaction.service';
import { TransactionModule } from './transaction/transaction.module';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { UserModule } from './users/user.module';
import { TransactionController } from './transaction/transaction.controller';
import { CatalogController } from './catalog/catalog.controller';

@Module({
  imports: [
    CatalogModule,
    ShoppingCartModule,
    TransactionModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/pegasus-shop'), 
    ],
  controllers: [
    UserController,
    TransactionController,
    CatalogController,
  ],
  providers: [
    UserService,
    CatalogService,
    ShoppingCartService,
    TransactionService,
  ],
})
export class AppModule {}
