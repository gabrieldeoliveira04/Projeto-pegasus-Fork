import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger'; // Importe ApiProperty

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @ApiProperty() // Adicione anotações Swagger
  @Prop({ required: true })
  amount: number;

  @ApiProperty() // Adicione anotações Swagger
  @Prop({ required: true })
  type: string;

  // Não é necessário adicionar anotações Swagger para este campo
  @Prop({ required: true, default: Date.now }) // Configura o campo para ser preenchido automaticamente com a data atual
  date: Date;

  @ApiProperty() // Adicione anotações Swagger
  @Prop({ required: true })
  userId: string;
}

// Crie o esquema do Mongoose com as configurações personalizadas
export const TransactionSchema = SchemaFactory.createForClass(Transaction).set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v; // Remova o campo '__v' do objeto retornado
    return ret;
  }
});
