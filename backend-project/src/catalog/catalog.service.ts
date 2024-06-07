import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from './schemas/catalog.schema';
import { CreateCatalogDto } from './dto/create.catalog.dto';
import { UpdateCatalogDto } from './dto/update.catalog.dto';

@Injectable()
export class CatalogService {
  constructor(@InjectModel(Catalog.name) private catalogModel: Model<CatalogDocument>) {}

  async create(createCatalogDtos: CreateCatalogDto[]): Promise<Catalog[]> {
    const createdCatalogs = await Promise.all(
      createCatalogDtos.map(createCatalogDto => {
        const createdCatalog = new this.catalogModel(createCatalogDto);
        return createdCatalog.save();
      })
    );
    return createdCatalogs;
  }

  async findAll(): Promise<Catalog[]> {
    return this.catalogModel.find().exec();
  }

  async findOne(id: string): Promise<Catalog> {
    return this.catalogModel.findById(id).exec();
  }

  async update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
    return this.catalogModel.findByIdAndUpdate(id, updateCatalogDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.catalogModel.findByIdAndDelete(id).exec();
  }
}
