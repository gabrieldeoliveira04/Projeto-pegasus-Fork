import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from './catalog/catalog.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { TransactionModule } from './transaction/transaction.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CatalogModule,
    ShoppingCartModule,
    TransactionModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://carlosgfkp:senha123@cluster0.eb17wf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
