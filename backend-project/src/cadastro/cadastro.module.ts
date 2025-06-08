import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CadastroService } from './cadastro.service';
import { CadastroController } from './cadastro.controller';
import { Usuario, UsuarioSchema } from './usuario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  providers: [CadastroService],
  controllers: [CadastroController],
})
export class CadastroModule {}

