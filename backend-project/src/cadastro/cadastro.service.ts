import { Injectable } from '@nestjs/common';

@Injectable()
export class CadastroService {
  async criarUsuario(dadosUsuario: any) {
    return { message: 'Usuário cadastrado com sucesso!', usuario: dadosUsuario };
  }
}
