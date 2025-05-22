import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from './catalog/catalog.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { TransactionModule } from './transaction/transaction.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CadastroModule } from './cadastro/cadastro.module';

@Module({
  imports: [
    CadastroModule,
    CatalogModule,
    ShoppingCartModule,
    TransactionModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://felipeca1268:felps1268@dbshop.scyb95h.mongodb.net/pegasus-shop?retryWrites=true&w=majority&appName=dbShop'),
    // MongooseModule.forRoot('mongodb+srv://carlosgfkp:senha123@cluster0.eb17wf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), 
    //mongodb://localhost:27017/pegasus-shop
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
