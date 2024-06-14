import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  /**
   * Método de ativação do guard que verifica a autenticação do usuário.
   *
   * @param context O contexto da execução.
   * @returns Um valor booleano que indica se o usuário está autenticado.
   * @throws UnauthorizedException Se a autenticação falhar.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    // Verifica se o token está ausente.
    if (!token) {
      throw new UnauthorizedException('Não autenticado. Faça login para acessar esta rota.');
    }

    try {
      // Verifica o token com a chave secreta.
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // 💡 Atribui o payload ao objeto de requisição (request) para acessá-lo nos handlers de rota.
      request['user'] = payload;
    } catch {
      // Lança uma exceção de UnauthorizedException se a verificação do token falhar.
      throw new UnauthorizedException('Não autenticado. Faça login para acessar esta rota.');
    }

    // Retorna true para permitir o acesso à rota protegida.
    return true;
  }

  /**
   * Extrai o token do cabeçalho de autorização da requisição.
   *
   * @param request O objeto de requisição HTTP.
   * @returns O token JWT ou undefined se não for encontrado.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
