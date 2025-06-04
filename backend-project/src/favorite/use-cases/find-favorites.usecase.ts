import { Injectable } from '@nestjs/common';
import { FavoriteService } from '../services/favorite.services';
import { CatalogService } from '../../catalog/services/catalog.service';

@Injectable()
export class FavoriteUseCase {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly catalogService: CatalogService,
  ) { }

  async executeAdd(userId: string, productId: string) {
    return this.favoriteService.addFavorite(userId, productId);
  }

  async executeGet(userId: string) {
    const favorites = await this.favoriteService.getFavorites(userId);

    const enrichedFavorites = await Promise.all(
      favorites.map(async (favorite) => {
        const product = await this.catalogService.findById(favorite.productId);
        const productObj = product && typeof product.toObject === 'function'
          ? product.toObject()
          : product;

        const favoriteObj = favorite && typeof favorite.toObject === 'function'
          ? favorite.toObject()
          : favorite;

        return {
          ...favoriteObj,
          ...productObj,
        };
      }),
    );

    return enrichedFavorites;
  }

  async executeDelete(userId: string, productId: string) {
    return this.favoriteService.removeFavorite(userId, productId);
  }
}