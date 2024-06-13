// create-catalog.usecase.ts
import { Injectable } from '@nestjs/common';
import { Catalog } from '../schemas/catalog.schema';
import { CreateCatalogDto } from '../dtos/create.catalog.dto';
import { CatalogRepository } from '../repositories/catalog.repository';

@Injectable()
export class CreateCatalogUseCase {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async execute(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    return this.catalogRepository.create(createCatalogDto);
  }
}
