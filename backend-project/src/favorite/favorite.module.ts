import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './schemas/favorite.schema';
import { FavoriteController } from './controllers/favorite.controller';
import { FavoriteService } from './services/favorite.services';
import { FavoriteRepository } from './repositories/favorite.repository';
import { FavoriteUseCase } from './use-cases/find-favorites.usecase';
import { CatalogModule } from 'src/catalog/catalog.module';

@Module({
  imports: [CatalogModule, MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }])],
  controllers: [FavoriteController],
  providers: [FavoriteService, FavoriteRepository, FavoriteUseCase],
})
export class FavoriteModule {}
