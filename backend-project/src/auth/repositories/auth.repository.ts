import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly usersService: UsersService) {}

  async findOneByEmail(email: string) {
    return this.usersService.findOneByEmail(email);
  }
}
