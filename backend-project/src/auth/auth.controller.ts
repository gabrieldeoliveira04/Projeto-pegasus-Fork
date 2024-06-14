import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './shared/auth.service';
import { UsersService } from 'src/users/shared/users.service';
import { SignInDto } from './shared/dto/singIn.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';

/**
 * Controlador para autenticação de usuários.
 */
@ApiTags('Auth') // Define a tag "Auth" na documentação Swagger
@Controller('auth') // Define o caminho base para todas as rotas do controlador
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /**
   * Rota para autenticar um usuário.
   * @param signInDto Os dados de autenticação do usuário.
   * @returns Um token JWT se a autenticação for bem-sucedida.
   */
  @HttpCode(HttpStatus.OK) // Define o código de status HTTP 200 (OK)
  @Post('login') // Rota POST para autenticar um usuário
  @ApiOperation({ summary: 'Autenticar um usuário' }) // Descrição da rota
  @ApiBody({ type: SignInDto, description: 'Dados de autenticação do usuário' }) // Corpo da requisição
  @ApiOkResponse({
    description: 'Autenticação bem-sucedida - token JWT gerado',
  }) // Descrição da resposta bem-sucedida
  @ApiBadRequestResponse({
    description: 'Usuário não encontrado ou senha incorreta',
  }) // Descrição do erro 400 (Bad Request)
  @ApiInternalServerErrorResponse({
    description: 'Erro interno do servidor ao autenticar o usuário',
  }) // Descrição do erro 500 (Internal Server Error)
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
    try {
      const { email, password } = signInDto;

      // Busca o usuário pelo e-mail usando o método findOneByEmail
      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        return { message: 'Usuário não encontrado' };
      }

      // Valida a senha usando o serviço AuthService
      const isPasswordValid = await this.authService.validatePassword(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        // Senha incorreta
        return { message: 'Senha incorreta' };
      }

      // Autenticação bem-sucedida - gera um token JWT e o retorna
      const token = await this.authService.signIn(email, password);

      return { token }; // Retorna o token JWT ou outra resposta apropriada
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro interno do servidor ao autenticar o usuário',
      );
    }
  }
}
