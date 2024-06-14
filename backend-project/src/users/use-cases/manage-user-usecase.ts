import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManageUserUseCase {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, ...userData } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('O email já está em uso.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new this.userModel({ ...userData, email, password: hashedPassword });

    return newUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }

    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id }).exec();
  }
}
