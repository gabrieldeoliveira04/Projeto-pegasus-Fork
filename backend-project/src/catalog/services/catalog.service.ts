import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateCatalogDto } from '../dtos/create.catalog.dto';
import { UpdateCatalogDto } from '../dtos/update.catalog.dto';
import { Catalog } from '../schemas/catalog.schema';
import { FindCatalogUseCase } from '../use-cases/find-catalog.usercase';
import { ManageCatalogUseCase } from '../use-cases/manage-catalog.usecase';

@Injectable()
export class CatalogService {
  constructor(
    private readonly findCatalogUseCase: FindCatalogUseCase,
    private readonly manageCatalogUseCase: ManageCatalogUseCase
  ) {}

  async findById(productId: string): Promise<Catalog> {
    try {
      const product = await this.findCatalogUseCase.findOne(productId);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch product');
    }
  }

  async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    try {
      return await this.manageCatalogUseCase.create(createCatalogDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create catalog item');
    }
  }

  async findAll(): Promise<Catalog[]> {
    try {
      return await this.findCatalogUseCase.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch catalog items');
    }
  }

  async findOne(id: string): Promise<Catalog> {
    try {
      const catalogItem = await this.findCatalogUseCase.findOne(id);
      if (!catalogItem) {
        throw new NotFoundException('Catalog item not found');
      }
      return catalogItem;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch catalog item');
    }
  }

  async update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
    try {
      const updatedCatalog = await this.manageCatalogUseCase.update(id, updateCatalogDto);
      if (!updatedCatalog) {
        throw new NotFoundException('Catalog item not found');
      }
      return updatedCatalog;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update catalog item');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.manageCatalogUseCase.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete catalog item');
    }
  }
}
