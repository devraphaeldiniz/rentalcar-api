// src/vehicles/schemas/vehicle.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

export enum VehicleStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
  MAINTENANCE = 'maintenance',
}

@Schema({ timestamps: true }) // timestamps habilita createdAt e updatedAt
export class Vehicle {
  @Prop({ required: true })
  modelo: string;

  @Prop({ required: true })
  marca: string;

  @Prop({ required: true })
  ano: number;

  @Prop({ required: true })
  potencia: string; // string para testes compatíveis

  @Prop({ required: true })
  categoria: string;

  @Prop()
  imagem?: string;

  @Prop({ required: true })
  precoAluguel: number;

  @Prop({ type: String, enum: VehicleStatus, default: VehicleStatus.AVAILABLE })
  status: VehicleStatus;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
