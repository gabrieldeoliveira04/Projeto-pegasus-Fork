import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CadastroService } from './cadastro.service';
import { CadastroDto } from './cadastro.dto';

@ApiTags('Cadastro')
@Controller('Cadastro')
export class CadastroController {
  constructor(private readonly cadastroService: CadastroService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de usuário' })
  @ApiBody({ type: CadastroDto })
  criarUsuario(@Body() dadosUsuario: CadastroDto) {
    return this.cadastroService.criarUsuario(dadosUsuario);
  }
}


