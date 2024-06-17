import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly usersService: UsersService) {}

  async findOneByEmail(email: string) {
    try {
      return await this.usersService.findOneByEmail(email);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
