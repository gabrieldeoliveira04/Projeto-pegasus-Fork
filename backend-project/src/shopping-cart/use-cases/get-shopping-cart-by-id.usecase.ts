import { Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingCart } from '../schemas/shopping-cart.schema';
import { ShoppingCartRepository } from '../repositories/shopping-cart.repository';

@Injectable()
export class GetShoppingCartByIdUseCase {
  constructor(private readonly shoppingCartRepository: ShoppingCartRepository) {}

  async execute(id: string): Promise<ShoppingCart> {
    const cart = await this.shoppingCartRepository.findById(id);
    if (!cart) {
      throw new NotFoundException('Shopping cart not found.');
    }
    return cart;
  }
}
