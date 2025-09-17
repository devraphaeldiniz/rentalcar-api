import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  CLIENTE = 'cliente',
  VENDEDOR = 'vendedor',
  ADMIN = 'admin',
  FISCAL = 'fiscal',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  senha: string; // 🔹 será armazenada com hash (bcrypt)

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop()
  endereco?: string; // opcional (cliente)

  @Prop()
  matricula?: string; // apenas vendedor

  @Prop({ type: String, enum: UserRole, default: UserRole.CLIENTE })
  role: UserRole;

  @Prop()
  twoFactorSecret?: string; // 🔹 usado para TOTP futuramente

  @Prop({ default: false })
  isTwoFactorEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
