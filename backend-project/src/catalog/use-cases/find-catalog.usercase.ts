import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Catalog } from '../schemas/catalog.schema';
import { CatalogRepository } from '../repositories/catalog.repository';

@Injectable()
export class FindCatalogUseCase {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async findAll(): Promise<Catalog[]> {
    try {
      return await this.catalogRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch catalog items');
    }
  }

  async findOne(id: string): Promise<Catalog> {
    try {
      const catalog = await this.catalogRepository.findById(id);
      if (!catalog) {
        throw new NotFoundException('Catalog item not found');
      }
      return catalog;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException('Catalog item not found');
      }
      throw new InternalServerErrorException('Failed to fetch catalog item');
    }
  }
}
