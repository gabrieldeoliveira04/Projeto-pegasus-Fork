// catalog.service.ts
import { Injectable } from '@nestjs/common';
import { CatalogRepository } from '../repositories/catalog.repository';
import { CreateCatalogDto } from '../dtos/create.catalog.dto';
import { UpdateCatalogDto } from '../dtos/update.catalog.dto';
import { Catalog } from '../schemas/catalog.schema';
import { CreateCatalogUseCase } from '../use-cases/create-catalog.usecase';
import { GetAllCatalogsUseCase } from '../use-cases/get-all-catalogs.usecase';
import { GetCatalogByIdUseCase } from '../use-cases/get-catalog-by-id.usecase';
import { UpdateCatalogUseCase } from '../use-cases/update-catalog.usecase';
import { DeleteCatalogUseCase } from '../use-cases/delete-catalog.usecase';

@Injectable()
export class CatalogService {
  constructor(
    private readonly createCatalogUseCase: CreateCatalogUseCase,
    private readonly getAllCatalogsUseCase: GetAllCatalogsUseCase,
    private readonly getCatalogByIdUseCase: GetCatalogByIdUseCase,
    private readonly updateCatalogUseCase: UpdateCatalogUseCase,
    private readonly deleteCatalogUseCase: DeleteCatalogUseCase,
  ) {}

  async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    return this.createCatalogUseCase.execute(createCatalogDto);
  }

  async findAll(): Promise<Catalog[]> {
    return this.getAllCatalogsUseCase.execute();
  }

  async findOne(id: string): Promise<Catalog> {
    return this.getCatalogByIdUseCase.execute(id);
  }

  async update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
    return this.updateCatalogUseCase.execute(id, updateCatalogDto);
  }

  async remove(id: string): Promise<void> {
    return this.deleteCatalogUseCase.execute(id);
  }
}
