import { Injectable } from '@nestjs/common';
import { ShoppingCart } from '../schemas/shopping-cart.schema';
import { ShoppingCartRepository } from '../repositories/shopping-cart.repository';
import { CreateShoppingCartDto } from '../dto/create.shopping-cart.dto';

@Injectable()
export class CreateShoppingCartUseCase {
  constructor(private readonly shoppingCartRepository: ShoppingCartRepository) {}

  async execute(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
    return this.shoppingCartRepository.create(createShoppingCartDto);
  }
}
