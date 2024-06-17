import { Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingCart } from '../schemas/shopping-cart.schema';
import { ShoppingCartRepository } from '../repositories/shopping-cart.repository';
import { CreateShoppingCartDto } from '../dto/create.shopping-cart.dto';
import { UpdateShoppingCartDto } from '../dto/update.shopping-cart.dto';

@Injectable()
export class ManageShoppingCartUseCase {
  constructor(private readonly shoppingCartRepository: ShoppingCartRepository) {}

  async create(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    return this.shoppingCartRepository.create(createShoppingCartDto);
  }

  async delete(id: string): Promise<void> {
    const result = await this.shoppingCartRepository.delete(id);
    if (result === null) {
      throw new NotFoundException('Shopping cart not found.');
    }
  }

  async update(id: string, updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
    const updatedCart = await this.shoppingCartRepository.update(id, updateShoppingCartDto);
    if (!updatedCart) {
      throw new NotFoundException('Shopping cart not found.');
    }
    return updatedCart;
  }
}
