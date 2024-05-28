import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingCart, ShoppingCartDocument } from './schemas/shopping-cart.schema';
import { CreateShoppingCartDto } from './dto/create.shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update.shopping-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(@InjectModel(ShoppingCart.name) private shoppingCartModel: Model<ShoppingCartDocument>) {}

  async create(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    const createdCart = new this.shoppingCartModel(createShoppingCartDto);
    return createdCart.save();
  }

  async findAll(): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.find().exec();
  }

  async findOne(id: string): Promise<ShoppingCart> {
    return this.shoppingCartModel.findById(id).exec();
  }

  async update(id: string, updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
    return this.shoppingCartModel.findByIdAndUpdate(id, updateShoppingCartDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.shoppingCartModel.findByIdAndDelete(id).exec();
  }
}
