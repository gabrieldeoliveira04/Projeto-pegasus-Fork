import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger'; // Importe ApiProperty

export type CatalogDocument = Catalog & Document;

@Schema()
export class Catalog {
  @ApiProperty() // Adicione anotações Swagger
  @Prop({ required: true })
  name: string;

  @ApiProperty() // Adicione anotações Swagger
  @Prop()
  description: string;

  // Adicione outras propriedades conforme necessário
}

// Crie o esquema do Mongoose com as configurações personalizadas
export const CatalogSchema = SchemaFactory.createForClass(Catalog).set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v; // Remova o campo '__v' do objeto retornado
    return ret;
  }
});
