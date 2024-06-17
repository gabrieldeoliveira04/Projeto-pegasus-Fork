import { Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingCart } from 'src/shopping-cart/schemas/shopping-cart.schema';
import { ShoppingCartRepository } from 'src/shopping-cart/repositories/shopping-cart.repository';

@Injectable()
export class FindShoppingCartUseCase {
  constructor(private readonly shoppingCartRepository: ShoppingCartRepository) {}

  async findById(id: string): Promise<ShoppingCart> {
    const cart = await this.shoppingCartRepository.findById(id);
    if (!cart) {
      throw new NotFoundException('Shopping cart not found.');
    }
    return cart;
  }

  async findAll(): Promise<ShoppingCart[]> {
    return this.shoppingCartRepository.findAll();
  }
}
