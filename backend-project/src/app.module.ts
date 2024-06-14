import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogService } from './catalog/services/catalog.service';
import { CatalogModule } from './catalog/catalog.module';
import { ShoppingCartService } from './shopping-cart/services/shopping-cart.service';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { TransactionService } from './transaction/transaction.service';
import { TransactionModule } from './transaction/transaction.module';
import { UserController } from './users/users.controller';
import { UsersService } from './users/shared/users.service';
import { TransactionController } from './transaction/transaction.controller';
import { CatalogController } from './catalog/controllers/catalog.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CatalogModule,
    ShoppingCartModule,
    TransactionModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/pegasus-shop'), 
  ],
  controllers: [

  ],
  providers: [

  ],
})
export class AppModule {}
