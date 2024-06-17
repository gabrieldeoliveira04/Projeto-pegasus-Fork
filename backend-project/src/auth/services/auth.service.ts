import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { SignInUseCase } from '../use-cases/sing-in.usecase';

@Injectable()
export class AuthService {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async signIn(email: string, password: string) {
    try {
      return await this.signInUseCase.signIn(email, password);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Incorrect password');
      } else {
        throw new InternalServerErrorException('Internal server error during sign-in');
      }
    }
  }
}
