import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ShoppingCartDocument = ShoppingCart & Document;

@Schema()
export class ShoppingCart {
  @ApiProperty()
  @Prop({ required: true })
  userId: string;

  @ApiProperty()
  @Prop([{ productId: String, quantity: Number }])
  items: {
    productId: string;
    quantity: number;
  }[];
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart).set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  }
});
