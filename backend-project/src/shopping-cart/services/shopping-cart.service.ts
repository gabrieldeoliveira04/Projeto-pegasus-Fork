import { FindShoppingCartUseCase } from './../use-cases/find-shopping-cart.usecase';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingCart } from '../schemas/shopping-cart.schema';
import { CreateShoppingCartDto } from '../dto/create.shopping-cart.dto';
import { UpdateShoppingCartDto } from '../dto/update.shopping-cart.dto';
import { ManageShoppingCartUseCase } from '../use-cases/manage-shopping-cart.usecase';
@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly manageShoppingCartUseCase: ManageShoppingCartUseCase,
    private readonly findShoppingCartUseCase: FindShoppingCartUseCase
  ) {}

  async create(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    return this.manageShoppingCartUseCase.create(createShoppingCartDto);
  }

  async findAll(): Promise<ShoppingCart[]> {
    return this.findShoppingCartUseCase.findAll();
  }

  async findOne(id: string): Promise<ShoppingCart> {
    return this.findShoppingCartUseCase.findById(id);
  }

  async update(id: string, updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
    return this.manageShoppingCartUseCase.update(id, updateShoppingCartDto);
  }

  async remove(id: string): Promise<void> {
    return this.manageShoppingCartUseCase.delete(id);
  }
}
