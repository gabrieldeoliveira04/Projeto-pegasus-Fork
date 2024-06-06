import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CatalogDocument = Catalog & Document;

@Schema()
export class Catalog {
  @ApiProperty({ example: 'Mercedes-Benz' })
  @Prop({ required: true })
  marca: string;

  @ApiProperty({ example: 'AMG GT' })
  @Prop({ required: true })
  modelo: string;

  @ApiProperty({ example: '4.0 V8 turbo gasolina' })
  @Prop({ required: true })
  motorizacao: string;

  @ApiProperty({ example: null })
  @Prop()
  carroceria: string;

  @ApiProperty({ example: 'R 7G DCT' })
  @Prop({ required: true })
  transmissao: string;

  @ApiProperty({ example: 'R$ 2.150.000' })
  @Prop({ required: true })
  preco: string;

  @ApiProperty({ example: 2020 })
  @Prop({ required: true })
  ano: number;

  @ApiProperty({ example: null })
  @Prop()
  versao: string;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog).set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  }
});
