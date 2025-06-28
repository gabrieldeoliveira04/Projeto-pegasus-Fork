import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './usuario.schema';
import { CadastroDto } from './cadastro.dto';

@Injectable()
export class CadastroService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
  ) {}

  async criarUsuario(dadosUsuario: CadastroDto): Promise<Usuario> {

    const novoUsuario = new this.usuarioModel(dadosUsuario);

    return novoUsuario.save();
  }
}

