import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogController } from './controllers/catalog.controller';
import { CatalogService } from './services/catalog.service';
import { Catalog, CatalogSchema } from './schemas/catalog.schema';
import { CatalogRepository } from './repositories/catalog.repository';
import { FindCatalogUseCase } from './use-cases/find-catalog.usercase';
import { ManageCatalogUseCase } from './use-cases/manage-catalog.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }])
  ],
  controllers: [CatalogController],
  providers: [
    CatalogRepository,
    CatalogService,
    FindCatalogUseCase,
    ManageCatalogUseCase,
  ],
  exports: [
    CatalogRepository,
    CatalogService,
    FindCatalogUseCase,
    ManageCatalogUseCase,
  ],
})
export class CatalogModule {}
