import { Injectable } from '@nestjs/common';
import { ShoppingCart } from '../schemas/shopping-cart.schema';
import { ShoppingCartRepository } from '../repositories/shopping-cart.repository';
import { CreateShoppingCartDto } from '../dto/create.shopping-cart.dto';
import { UpdateShoppingCartDto } from '../dto/update.shopping-cart.dto';
import { CreateShoppingCartUseCase } from '../use-cases/create-shopping-cart.usecase';
import { GetAllShoppingCartsUseCase } from '../use-cases/get-all-shopping-carts.usecase';
import { GetShoppingCartByIdUseCase } from '../use-cases/get-shopping-cart-by-id.usecase';
import { UpdateShoppingCartUseCase } from '../use-cases/update-shopping-cart.usecase';
import { DeleteShoppingCartUseCase } from '../use-cases/delete-shopping-cart.usecase';

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly createShoppingCartUseCase: CreateShoppingCartUseCase,
    private readonly getAllShoppingCartsUseCase: GetAllShoppingCartsUseCase,
    private readonly getShoppingCartByIdUseCase: GetShoppingCartByIdUseCase,
    private readonly updateShoppingCartUseCase: UpdateShoppingCartUseCase,
    private readonly deleteShoppingCartUseCase: DeleteShoppingCartUseCase,
  ) {}

  async create(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    return this.createShoppingCartUseCase.execute(createShoppingCartDto);
  }

  async findAll(): Promise<ShoppingCart[]> {
    return this.getAllShoppingCartsUseCase.execute();
  }

  async findOne(id: string): Promise<ShoppingCart> {
    return this.getShoppingCartByIdUseCase.execute(id);
  }

  async update(id: string, updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
    return this.updateShoppingCartUseCase.execute(id, updateShoppingCartDto);
  }

  async remove(id: string): Promise<void> {
    return this.deleteShoppingCartUseCase.execute(id);
  }
}
