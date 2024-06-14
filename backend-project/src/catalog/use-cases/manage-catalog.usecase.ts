import { Injectable, NotFoundException } from '@nestjs/common';
import { Catalog } from '../schemas/catalog.schema';
import { CreateCatalogDto } from '../dtos/create.catalog.dto';
import { UpdateCatalogDto } from '../dtos/update.catalog.dto';
import { CatalogRepository } from '../repositories/catalog.repository';

@Injectable()
export class ManageCatalogUseCase {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    return this.catalogRepository.create(createCatalogDto);
  }

  async update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
    const updatedCatalog = await this.catalogRepository.update(id, updateCatalogDto);
    if (!updatedCatalog) {
      throw new NotFoundException('Catalog item not found.');
    }
    return updatedCatalog;
  }

  async delete(id: string): Promise<void> {
    const result = await this.catalogRepository.delete(id);
    if (result === 0) {
      throw new NotFoundException('Catalog item not found.');
    }
  }
}
