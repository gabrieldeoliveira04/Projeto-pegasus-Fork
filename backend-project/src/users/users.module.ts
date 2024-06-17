import { UsersService } from './services/users.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/users.controller';
import { UserSchema } from './schemas/user.schema';
import { FindUserUseCase } from './use-cases/find-user.usecase';
import { ManageUserUseCase } from './use-cases/manage-user-usecase';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UsersService,
    UserRepository,
    FindUserUseCase,
    ManageUserUseCase
  ],
  exports: [
    UsersService,
    UserRepository,
    FindUserUseCase,
    ManageUserUseCase
  ],
})
export class UsersModule {}
