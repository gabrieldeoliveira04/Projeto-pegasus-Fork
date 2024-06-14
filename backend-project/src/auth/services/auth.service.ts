import { Injectable } from '@nestjs/common';
import { SignInUseCase } from '../use-cases/sing-in.usecase';

@Injectable()
export class AuthService {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async signIn(email: string, password: string) {
    return this.signInUseCase.signIn(email, password);
  }
}
