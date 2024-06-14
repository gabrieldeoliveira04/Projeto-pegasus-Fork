import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  /**
   * Busca e retorna todos os usuários.
   * @returns Uma lista de objetos do tipo User.
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * Busca e retorna um usuário pelo ID.
   * @param id O ID do usuário a ser encontrado.
   * @returns Um objeto do tipo User ou null se não encontrado.
   */
  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  /**
   * Busca e retorna um usuário pelo email.
   * @param email O email do usuário a ser encontrado.
   * @returns Um objeto do tipo User.
   * @throws NotFoundException se o usuário não for encontrado.
   */
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async existingUser(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }  

  /**
   * Cria um novo usuário com base nos dados fornecidos.
   * @param createUserDto Os dados do usuário a serem criados.
   * @returns O usuário criado.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
  
    // Gera um hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    // Cria um novo usuário com a senha criptografada
    const newUser = new this.userModel({ ...userData, password: hashedPassword });
  
    return newUser.save();
  }

  /**
   * Atualiza um usuário pelo ID.
   * @param id O ID do usuário a ser atualizado.
   * @param updateUserDto Os dados de atualização do usuário.
   * @returns O usuário atualizado ou null se o usuário não existir.
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    // Verifica se a senha está incluída no objeto de atualização
    if (updateUserDto.password) {
      // Gera um hash da nova senha
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }

    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    }).exec();
  }

  /**
   * Exclui um usuário pelo ID.
   * @param id O ID do usuário a ser excluído.
   */
  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id }).exec();
  }
}
