import { Injectable } from '@nestjs/common';
import { FavoriteRepository } from '../repositories/favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async addFavorite(userId: string, productId: string) {
    if (!userId || !productId) {
      throw new Error('userId e productId são necessários.');
    }
    
    return this.favoriteRepository.create(userId, productId);
  }  

  async getFavorites(userId: string) {
    return this.favoriteRepository.findAllByUser(userId);
  }

  async removeFavorite(userId: string, productId: string) {
    return this.favoriteRepository.delete(userId, productId);
  }
}
