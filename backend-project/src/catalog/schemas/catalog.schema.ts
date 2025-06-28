import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CatalogDocument = Catalog & Document;

@Schema()
export class Catalog {
  toObject() {
    throw new Error('Method not implemented.');
  }
  toJSON(): any {
    throw new Error('Method not implemented.');
  }
  
  @ApiProperty({ example: 'https://exemplo.com/imagem.jpg', nullable: true })
  @Prop({ required: false })
  image?: string;

  @ApiProperty({ example: 'Aston-Martin' })
  @Prop({ required: true })
  marca: string;

  @ApiProperty({ example: 'BDS' })
  @Prop({ required: true })
  modelo: string;

  @ApiProperty({ example: '5.7 V12 turbo gasolina' })
  @Prop({ required: true })
  motorizacao: string;

  @ApiProperty({ example: 'Coupe', nullable: true })
  @Prop()
  carroceria?: string;

  @ApiProperty({ example: 'Automático', nullable: true })
  @Prop()
  transmissao?: string;

  @ApiProperty({ example: 'R$ 4.200.000' })
  @Prop({ required: true })
  preco: string;

  @ApiProperty({ example: 2022 })
  @Prop({ required: true })
  ano: number;

  @ApiProperty({ example: 'Luxury', nullable: true })
  @Prop()
  versao?: string;

  @ApiProperty({ example: 'Descrição do veículo', nullable: true })
  @Prop()
  descricao: string;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog).set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  }
});
