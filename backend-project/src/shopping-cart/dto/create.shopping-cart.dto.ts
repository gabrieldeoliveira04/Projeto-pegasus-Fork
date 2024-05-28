import { ApiProperty } from '@nestjs/swagger'; // Importe ApiProperty

export class CreateShoppingCartDto {
  @ApiProperty() // Adicione anotações Swagger
  userId: string;

  @ApiProperty() // Adicione anotações Swagger
  items: {
    productId: string;
    quantity: number;
  }[];
}
