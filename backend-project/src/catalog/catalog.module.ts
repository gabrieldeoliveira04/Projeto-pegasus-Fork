import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogController } from './controllers/catalog.controller';
import { CatalogService } from './services/catalog.service';
import { Catalog, CatalogSchema } from './schemas/catalog.schema';
import { CatalogRepository } from './repositories/catalog.repository';
import { CreateCatalogUseCase } from './use-cases/create-catalog.usecase';
import { GetAllCatalogsUseCase } from './use-cases/get-all-catalogs.usecase';
import { GetCatalogByIdUseCase } from './use-cases/get-catalog-by-id.usecase';
import { UpdateCatalogUseCase } from './use-cases/update-catalog.usecase';
import { DeleteCatalogUseCase } from './use-cases/delete-catalog.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }])
  ],
  controllers: [CatalogController],
  providers: [
    CatalogRepository,
    CatalogService,
    CreateCatalogUseCase,
    GetAllCatalogsUseCase,
    GetCatalogByIdUseCase,
    UpdateCatalogUseCase,
    DeleteCatalogUseCase
  ],
  exports: [
    CatalogRepository,
    CatalogService,
    CreateCatalogUseCase,
    GetAllCatalogsUseCase,
    GetCatalogByIdUseCase,
    UpdateCatalogUseCase,
    DeleteCatalogUseCase,
    MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }])
  ],
})
export class CatalogModule {}
