import { ApiProperty } from '@nestjs/swagger'; // Importe ApiProperty

export class CreateTransactionDto {
  @ApiProperty() // Adicione anotações Swagger
  amount: number;

  @ApiProperty() // Adicione anotações Swagger
  type: string;

  @ApiProperty() // Adicione anotações Swagger
  userId: string;
}
