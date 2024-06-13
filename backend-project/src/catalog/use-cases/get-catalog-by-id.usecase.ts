// get-catalog-by-id.usecase.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Catalog } from '../schemas/catalog.schema';
import { CatalogRepository } from '../repositories/catalog.repository';

@Injectable()
export class GetCatalogByIdUseCase {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async execute(id: string): Promise<Catalog> {
    const catalog = await this.catalogRepository.findById(id);
    if (!catalog) {
      throw new NotFoundException('Catalog item not found.');
    }
    return catalog;
  }
}
