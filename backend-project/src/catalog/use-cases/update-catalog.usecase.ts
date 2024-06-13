// update-catalog.usecase.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Catalog } from '../schemas/catalog.schema';
import { UpdateCatalogDto } from '../dtos/update.catalog.dto';
import { CatalogRepository } from '../repositories/catalog.repository';

@Injectable()
export class UpdateCatalogUseCase {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async execute(id: string, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
    const updatedCatalog = await this.catalogRepository.update(id, updateCatalogDto);
    if (!updatedCatalog) {
      throw new NotFoundException('Catalog item not found.');
    }
    return updatedCatalog;
  }
}
