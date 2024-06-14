import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/shared/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Autentica um usuário com base no email e na senha fornecidos.
   * @param email O email do usuário.
   * @param password A senha do usuário em texto simples.
   * @returns Um token de acesso JWT se a autenticação for bem-sucedida.
   * @throws UnauthorizedException Se o usuário não for encontrado ou a senha for incorreta.
   */
  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Verifique se a senha fornecida corresponde à senha armazenada no banco de dados
    const isPasswordValid = await this.validatePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    // Autenticação bem-sucedida - gere um token JWT e retorne-o aqui
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Valida a senha fornecida em texto simples em relação à senha armazenada no banco de dados.
   * @param plainTextPassword A senha fornecida em texto simples.
   * @param hashedPassword A senha armazenada no banco de dados em formato de hash.
   * @returns true se a senha for válida, false caso contrário.
   */
  async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      // Compare a senha fornecida com a senha armazenada no banco de dados (em hash)
      return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
      console.error(error); // Registra erros de comparação (se houverem)
      return false;
    }
  }
}
