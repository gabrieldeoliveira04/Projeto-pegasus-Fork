// delete-catalog.usecase.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Catalog } from '../schemas/catalog.schema';
import { CatalogRepository } from '../repositories/catalog.repository';

@Injectable()
export class DeleteCatalogUseCase {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  async execute(id: string): Promise<void> {
    const result = await this.catalogRepository.delete(id);
    if (result === 0) {
      throw new NotFoundException('Catalog item not found.');
    }
  }
}
