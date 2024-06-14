import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { jwtConstants } from './constants';
import { AuthRepository } from './repositories/auth.repository';
import { SignInUseCase } from './use-cases/sing-in.usecase';
import { ValidatePasswordUseCase } from './use-cases/validate-password.usecase';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    AuthService,
    AuthRepository,
    SignInUseCase,
    ValidatePasswordUseCase
  ],
  controllers: [AuthController],
  exports: [   
    AuthService,
    AuthRepository,
    SignInUseCase,
    ValidatePasswordUseCase
  ],
})
export class AuthModule {}
