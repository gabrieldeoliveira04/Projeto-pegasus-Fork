import { ApiProperty } from '@nestjs/swagger';
import { ShoppingCartItemDto } from './shopping-cart.dto';

export class CreateShoppingCartDto {
  @ApiProperty({ example: '66552bfc2ded290e7e379d17' })
  userId: string;

  @ApiProperty({ type: [ShoppingCartItemDto], example: [
    {
      productId: '666b3bf0bff0b1cc6fdea87d',
      quantity: 1
    }
  ] })
  items: ShoppingCartItemDto[];
}
