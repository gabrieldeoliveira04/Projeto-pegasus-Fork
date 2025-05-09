import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Favorite extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  productId: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
