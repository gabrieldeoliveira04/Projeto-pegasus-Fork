import { Injectable, NotFoundException } from '@nestjs/common';
import { Catalog } from '../schemas/catalog.schema';
import { CatalogRepository } from '../repositories/catalog.repository';

@Injectable()
export class FindCatalogUseCase {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async findAll(): Promise<Catalog[]> {
    return this.catalogRepository.findAll();
  }

  async findOne(id: string): Promise<Catalog> {
    const catalog = await this.catalogRepository.findById(id);
    if (!catalog) {
      throw new NotFoundException('Catalog item not found.');
    }
    return catalog;
  }
}
