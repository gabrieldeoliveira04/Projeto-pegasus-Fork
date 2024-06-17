import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Catalog } from '../schemas/catalog.schema';
import { CreateCatalogDto } from '../dtos/create.catalog.dto';
import { UpdateCatalogDto } from '../dtos/update.catalog.dto';
import { CatalogRepository } from '../repositories/catalog.repository';

@Injectable()
export class ManageCatalogUseCase {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    try {
      return await this.catalogRepository.create(createCatalogDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create catalog item');
    }
  }

  async update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
    try {
      const updatedCatalog = await this.catalogRepository.update(id, updateCatalogDto);
      if (!updatedCatalog) {
        throw new NotFoundException('Catalog item not found');
      }
      return updatedCatalog;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException('Catalog item not found');
      }
      throw new InternalServerErrorException('Failed to update catalog item');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.catalogRepository.delete(id);
      if (result === 0) {
        throw new NotFoundException('Catalog item not found');
      }
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException('Catalog item not found');
      }
      throw new InternalServerErrorException('Failed to delete catalog item');
    }
  }
}
