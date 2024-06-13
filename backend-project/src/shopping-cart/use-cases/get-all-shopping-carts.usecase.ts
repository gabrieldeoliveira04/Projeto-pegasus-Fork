import { Injectable } from '@nestjs/common';
import { ShoppingCart } from '../schemas/shopping-cart.schema';
import { ShoppingCartRepository } from '../repositories/shopping-cart.repository';

@Injectable()
export class GetAllShoppingCartsUseCase {
  constructor(private readonly shoppingCartRepository: ShoppingCartRepository) {}

  async execute(): Promise<ShoppingCart[]> {
    return this.shoppingCartRepository.findAll();
  }
}
