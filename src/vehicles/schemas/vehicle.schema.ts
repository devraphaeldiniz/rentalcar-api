import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true })
  modelo: string;

  @Prop({ required: true })
  marca: string;

  @Prop({ required: true })
  ano: number;

  @Prop({ required: true })
  potencia: string;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true })
  precoAluguel: number;

  @Prop([String])
  imagens: string[];

  @Prop()
  descricao?: string;

  @Prop()
  transmissao?: string;

  @Prop()
  combustivel?: string;

  @Prop()
  portas?: number;

  @Prop()
  assentos?: number;

  @Prop()
  quilometragem?: number;

  @Prop()
  placa?: string;

  @Prop({ default: 'disponivel' })
  status: 'disponivel' | 'manutencao' | 'indisponivel';
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
