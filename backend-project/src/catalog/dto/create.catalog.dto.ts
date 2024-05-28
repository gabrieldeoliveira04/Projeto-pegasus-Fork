import { ApiProperty } from '@nestjs/swagger'; // Importe ApiProperty

export class CreateCatalogDto {
  @ApiProperty() // Adicione anotações Swagger
  name: string;

  @ApiProperty() // Adicione anotações Swagger
  description: string;
}
