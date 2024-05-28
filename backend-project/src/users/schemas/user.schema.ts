import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Ative os timestamps se necessário
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export type UserDocument = User & Document;

// Crie o esquema do Mongoose com as configurações personalizadas
export const UserSchema = SchemaFactory.createForClass(User).set('toJSON', {
  transform: function (doc, ret) {
    // Exclua o campo '__v' do objeto retornado
    delete ret.__v;
    return ret;
  }
});
