// get-all-catalogs.usecase.ts
import { Injectable } from '@nestjs/common';
import { Catalog } from '../schemas/catalog.schema';
import { CatalogRepository } from '../repositories/catalog.repository';

@Injectable()
export class GetAllCatalogsUseCase {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async execute(): Promise<Catalog[]> {
    return this.catalogRepository.findAll();
  }
}
