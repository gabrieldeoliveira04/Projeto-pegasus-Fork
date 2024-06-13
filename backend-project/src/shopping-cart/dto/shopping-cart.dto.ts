import { ApiProperty } from '@nestjs/swagger';

export class ShoppingCartItemDto {
  @ApiProperty({ example: '666b3bf0bff0b1cc6fdea87d' })
  productId: string;

  @ApiProperty({ example: 1 })
  quantity: number;
}
