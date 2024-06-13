import { Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingCartRepository } from '../repositories/shopping-cart.repository';

@Injectable()
export class DeleteShoppingCartUseCase {
  constructor(private readonly shoppingCartRepository: ShoppingCartRepository) {}

  async execute(id: string): Promise<void> {
    const result = await this.shoppingCartRepository.delete(id);
    if (result === null) {
      throw new NotFoundException('Shopping cart not found.');
    }
  }
}
