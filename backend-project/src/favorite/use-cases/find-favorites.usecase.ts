import { Injectable } from '@nestjs/common';
import { FavoriteService } from '../services/favorite.services';

@Injectable()
export class FavoriteUseCase {
  constructor(private readonly favoriteService: FavoriteService) {}

  async executeAdd(userId: string, productId: string) {
    return this.favoriteService.addFavorite(userId, productId);
  }

  async executeGet(userId: string) {
    return this.favoriteService.getFavorites(userId);
  }

  async executeDelete(userId: string, productId: string) {
    return this.favoriteService.removeFavorite(userId, productId);
  }
}