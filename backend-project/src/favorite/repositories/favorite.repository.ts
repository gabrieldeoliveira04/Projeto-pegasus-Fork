import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from '../schemas/favorite.schema';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
  ) {}

  async create(userId: string, productId: string) {
    return this.favoriteModel.create({ userId, productId });
  }

  async findAllByUser(userId: string) {
    return this.favoriteModel.find({ userId });
  }

  async delete(userId: string, productId: string) {
    return this.favoriteModel.deleteOne({ userId, productId });
  }
}
