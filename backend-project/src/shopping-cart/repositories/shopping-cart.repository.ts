import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingCart, ShoppingCartDocument } from './../schemas/shopping-cart.schema';
import { CreateShoppingCartDto } from '../dto/create.shopping-cart.dto';
import { UpdateShoppingCartDto } from '../dto/update.shopping-cart.dto';
import { CatalogService } from 'src/catalog/services/catalog.service';

@Injectable()
export class ShoppingCartRepository {
  constructor(
    @InjectModel(ShoppingCart.name) private readonly shoppingCartModel: Model<ShoppingCartDocument>,
    private readonly catalogService: CatalogService
  ) {}

  async create(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    const createdCart = new this.shoppingCartModel(createShoppingCartDto);
    return createdCart.save();
  }

  async findAll(): Promise<any[]> {
    const shoppingCarts = await this.shoppingCartModel.find().exec();

    const result = await Promise.all(shoppingCarts.map(async (cart) => {
      const itemsWithCatalogData = await Promise.all(cart.items.map(async (item) => {
        const catalogData = await this.catalogService.findOne(item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          catalogData: catalogData ? catalogData.toJSON() : null,
        };
      }));

      return {
        _id: cart._id,
        userId: cart.userId,
        items: itemsWithCatalogData,
      };
    }));

    return result;
  }

  async findById(id: string): Promise<ShoppingCart> {
    return this.shoppingCartModel.findById(id).exec();
  }

  async update(id: string, updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
    return this.shoppingCartModel.findByIdAndUpdate(id, updateShoppingCartDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.shoppingCartModel.findByIdAndDelete(id).exec();
  }
}
