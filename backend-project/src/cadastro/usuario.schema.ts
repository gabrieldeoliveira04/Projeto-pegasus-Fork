import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  CPF: string;

  @Prop({ required: true })
  senha: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
