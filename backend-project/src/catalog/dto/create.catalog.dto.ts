import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCatalogDto {
  @ApiProperty({ example: 'Mercedes-Benz' })
  @IsString()
  @IsNotEmpty()
  marca: string;

  @ApiProperty({ example: 'AMG GT' })
  @IsString()
  @IsNotEmpty()
  modelo: string;

  @ApiProperty({ example: '4.0 V8 turbo gasolina' })
  @IsString()
  @IsNotEmpty()
  motorizacao: string;

  @ApiProperty({ example: null, nullable: true })
  @IsOptional()
  @IsString()
  carroceria: string | null;

  @ApiProperty({ example: 'R 7G DCT', nullable: true })
  @IsOptional()
  @IsString()
  transmissao: string | null;

  @ApiProperty({ example: 'R$ 2.150.000' })
  @IsString()
  @IsNotEmpty()
  preco: string;

  @ApiProperty({ example: 2020 })
  @IsNotEmpty()
  ano: number | string;

  @ApiProperty({ example: null, nullable: true })
  @IsOptional()
  @IsString()
  versao: string | null;
}
