import { Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingCart } from '../schemas/shopping-cart.schema';
import { ShoppingCartRepository } from '../repositories/shopping-cart.repository';
import { UpdateShoppingCartDto } from '../dto/update.shopping-cart.dto';

@Injectable()
export class UpdateShoppingCartUseCase {
  constructor(private readonly shoppingCartRepository: ShoppingCartRepository) {}

  async execute(id: string, updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
    const updatedCart = await this.shoppingCartRepository.update(id, updateShoppingCartDto);
    if (!updatedCart) {
      throw new NotFoundException('Shopping cart not found.');
    }
    return updatedCart;
  }
}
