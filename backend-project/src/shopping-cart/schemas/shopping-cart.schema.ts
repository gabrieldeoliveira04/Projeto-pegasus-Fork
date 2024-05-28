import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger'; // Importe ApiProperty

export type ShoppingCartDocument = ShoppingCart & Document;

@Schema()
export class ShoppingCart {
  @ApiProperty() // Adicione anotações Swagger
  @Prop({ required: true })
  userId: string;

  @ApiProperty() // Adicione anotações Swagger
  @Prop([{ productId: String, quantity: Number }])
  items: {
    productId: string;
    quantity: number;
  }[];
}

// Crie o esquema do Mongoose com as configurações personalizadas
export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart).set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v; // Remova o campo '__v' do objeto retornado
    return ret;
  }
});
