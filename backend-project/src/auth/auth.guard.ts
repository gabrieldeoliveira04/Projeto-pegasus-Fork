import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /**
   * Método para verificar se um usuário pode acessar uma rota protegida.
   *
   * @param context O contexto da execução.
   * @returns Um valor booleano que indica se o usuário tem permissão para acessar a rota.
   * @throws UnauthorizedException Se a autenticação falhar ou se o token for inválido.
   * @throws InternalServerErrorException Se ocorrer um erro interno ao verificar o token.
   */
  @ApiBearerAuth()
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Extrai o token do cabeçalho de autorização da requisição
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token de autorização ausente.');
    }

    try {
      // Verifica o token usando o serviço JWT
      const decodedToken = await this.jwtService.verifyAsync(token);

      // Verifica se o token corresponde a critérios personalizados
      if (!this.isValidToken(decodedToken, token)) {
        throw new UnauthorizedException('Acesso proibido. Token inválido ou expirado.');
      }

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      } else if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Acesso proibido. Token inválido ou expirado.');
      } else {
        throw new InternalServerErrorException('Erro interno ao verificar o token de autorização.');
      }
    }
  }

  /**
   * Método para verificar se o token é válido com base em critérios personalizados.
   *
   * @param decodedToken O token JWT decodificado.
   * @param token O token JWT original.
   * @returns true se o token for válido, false caso contrário.
   */
  private isValidToken(decodedToken: any, token: string): boolean {
    return true;
  }

  /**
   * Método para extrair o token do cabeçalho de autorização da requisição.
   *
   * @param request O objeto de requisição HTTP.
   * @returns O token JWT ou undefined se não for encontrado.
   */
  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers.authorization;

    if (authHeader) {
      const [type, token] = authHeader.split(' ');
      if (type === 'Bearer') {
        return token;
      }
    }

    return undefined;
  }
}
