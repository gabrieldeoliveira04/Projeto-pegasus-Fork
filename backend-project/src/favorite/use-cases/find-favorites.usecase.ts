import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class FindFavoriteUseCase {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async findAll(): Promise<Favorite[]> {
    try {
      return await this.favoriteRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch favorite items');
    }
  }
}
