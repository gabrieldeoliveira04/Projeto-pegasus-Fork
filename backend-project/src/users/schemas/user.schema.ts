import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: 'username' })
  @Prop({ required: true })
  username: string;

  @ApiProperty({ example: 'user@example.com' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: 'password' })
  @Prop({ required: true, select: false })
  password: string;

  @ApiProperty({ example: '2023-06-14T19:47:10.918Z' })
  @Prop({ default: Date.now })
  create_at: Date;

  @ApiProperty({ example: '2023-06-14T19:47:10.918Z', nullable: true })
  @Prop({ default: null })
  update_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User).set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    delete ret.create_at;
    delete ret.update_at;
  },
});
