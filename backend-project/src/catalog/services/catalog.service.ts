import { ManageCatalogUseCase } from './../use-cases/manage-catalog.usecase';
import { Injectable } from '@nestjs/common';
import { CreateCatalogDto } from '../dtos/create.catalog.dto';
import { UpdateCatalogDto } from '../dtos/update.catalog.dto';
import { Catalog } from '../schemas/catalog.schema';
import { FindCatalogUseCase } from '../use-cases/find-catalog.usercase';


@Injectable()
export class CatalogService {
  constructor(
    private readonly findCatalogUseCase: FindCatalogUseCase,
    private readonly manageCatalogUseCase: ManageCatalogUseCase
  ) {}

  async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    return this.manageCatalogUseCase.create(createCatalogDto);
  }

  async findAll(): Promise<Catalog[]> {
    return this.findCatalogUseCase.findAll();
  }

  async findOne(id: string): Promise<Catalog> {
    return this.findCatalogUseCase.findOne(id);
  }

  async update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
    return this.manageCatalogUseCase.update(id, updateCatalogDto);
  }

  async delete(id: string): Promise<void> {
    return this.manageCatalogUseCase.delete(id);
  }
}
