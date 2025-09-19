import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

export enum VehicleStatus {
  DISPONIVEL = 'disponivel',
  ALUGADO = 'alugado',
  MANUTENCAO = 'manutencao',
}

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true })
  modelo: string;

  @Prop({ required: true })
  marca: string;

  @Prop({ required: true })
  ano: number;

  @Prop({ required: true })
  potencia: number;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true })
  precoAluguel: number;

  @Prop({ enum: VehicleStatus, default: VehicleStatus.DISPONIVEL })
  status: VehicleStatus;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
