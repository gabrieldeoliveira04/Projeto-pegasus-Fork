import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { Catalog, CatalogSchema } from './schemas/catalog.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }])],
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService, MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }])],
})
export class CatalogModule {}
