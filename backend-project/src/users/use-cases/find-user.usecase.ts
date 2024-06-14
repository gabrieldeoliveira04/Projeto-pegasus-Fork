import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByEmail(email);
  }
}
