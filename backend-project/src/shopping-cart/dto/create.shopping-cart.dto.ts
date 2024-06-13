import { ApiProperty } from '@nestjs/swagger';

export class CreateShoppingCartDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  items: {
    productId: string;
    quantity: number;
  }[];
}
