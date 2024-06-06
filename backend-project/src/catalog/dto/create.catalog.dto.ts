import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogDto {
  @ApiProperty({ example: 'Mercedes-Benz' })
  marca: string;

  @ApiProperty({ example: 'AMG GT' })
  modelo: string;

  @ApiProperty({ example: '4.0 V8 turbo gasolina' })
  motorizacao: string;

  @ApiProperty({ example: null })
  carroceria: string;

  @ApiProperty({ example: 'R 7G DCT' })
  transmissao: string;

  @ApiProperty({ example: 'R$ 2.150.000' })
  preco: string;

  @ApiProperty({ example: 2020 })
  ano: number;

  @ApiProperty({ example: null })
  versao: string;
}
