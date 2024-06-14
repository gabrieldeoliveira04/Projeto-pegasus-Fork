import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './../schemas/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new this.userModel({ ...userData, password: hashedPassword });
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
