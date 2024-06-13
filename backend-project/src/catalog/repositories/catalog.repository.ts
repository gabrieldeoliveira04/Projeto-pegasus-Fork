// catalog.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from '../schemas/catalog.schema';
import { CreateCatalogDto } from '../dtos/create.catalog.dto';
import { UpdateCatalogDto } from '../dtos/update.catalog.dto';

@Injectable()
export class CatalogRepository {
  constructor(@InjectModel(Catalog.name) private readonly catalogModel: Model<CatalogDocument>) {}

  async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    const createdCatalog = new this.catalogModel(createCatalogDto);
    return createdCatalog.save();
  }

  async findAll(): Promise<Catalog[]> {
    return this.catalogModel.find().exec();
  }

  async findById(id: string): Promise<Catalog> {
    return this.catalogModel.findById(id).exec();
  }

  async update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
    return this.catalogModel.findByIdAndUpdate(id, updateCatalogDto, { new: true }).exec();
  }

  async delete(id: string): Promise<number> {
    const result = await this.catalogModel.deleteOne({ _id: id }).exec();
    return result.deletedCount;
  }
}
