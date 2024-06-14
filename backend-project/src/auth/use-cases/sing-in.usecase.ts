import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';
import { ValidatePasswordUseCase } from './validate-password.usecase';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly validatePasswordUseCase: ValidatePasswordUseCase,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.authRepository.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await this.validatePasswordUseCase.validatePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
