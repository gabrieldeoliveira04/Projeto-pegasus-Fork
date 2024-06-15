import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from '../schemas/catalog.schema';
import { CreateCatalogDto } from '../dtos/create.catalog.dto';
import { UpdateCatalogDto } from '../dtos/update.catalog.dto';

@Injectable()
export class CatalogRepository {
  constructor(@InjectModel(Catalog.name) private readonly catalogModel: Model<CatalogDocument>) {}

  async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    try {
      const createdCatalog = new this.catalogModel(createCatalogDto);
      return await createdCatalog.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create catalog item');
    }
  }

  async findAll(): Promise<Catalog[]> {
    try {
      return await this.catalogModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch catalog items');
    }
  }

  async findById(id: string): Promise<Catalog> {
    try {
      const catalogItem = await this.catalogModel.findById(id).exec();
      if (!catalogItem) {
        throw new NotFoundException('Catalog item not found');
      }
      return catalogItem;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException('Catalog item not found');
      }
      throw new InternalServerErrorException('Failed to fetch catalog item');
    }
  }

  async update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<Catalog> {
    try {
      const updatedCatalog = await this.catalogModel.findByIdAndUpdate(id, updateCatalogDto, { new: true }).exec();
      if (!updatedCatalog) {
        throw new NotFoundException('Catalog item not found');
      }
      return updatedCatalog;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException('Catalog item not found');
      }
      throw new InternalServerErrorException('Failed to update catalog item');
    }
  }

  async delete(id: string): Promise<number> {
    try {
      const result = await this.catalogModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Catalog item not found');
      }
      return result.deletedCount;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException('Catalog item not found');
      }
      throw new InternalServerErrorException('Failed to delete catalog item');
    }
  }
}
