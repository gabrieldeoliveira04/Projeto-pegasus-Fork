import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../schemas/user.schema'; // Importe diretamente do arquivo de modelo
import { FindUserUseCase } from '../use-cases/find-user.usecase';
import { ManageUserUseCase } from '../use-cases/manage-user-usecase';

@Injectable()
export class UsersService {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly manageUserUseCase: ManageUserUseCase,
  ) {}

  async findAll(): Promise<User[]> {
    return this.findUserUseCase.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return this.findUserUseCase.findById(id);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.findUserUseCase.findOneByEmail(email);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.manageUserUseCase.create(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.manageUserUseCase.update(id, updateUserDto);
  }

  async delete(id: string): Promise<void> {
    return this.manageUserUseCase.delete(id);
  }
}
