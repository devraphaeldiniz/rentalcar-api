// src/vehicles/entities/vehicle.entity.ts
import { VehicleStatus } from '../schemas/vehicle.schema';

export class VehicleEntity {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  potencia: string;
  categoria: string;
  imagem?: string;
  precoAluguel: number;
  status: VehicleStatus;
  createdAt: Date;
  updatedAt: Date;
}
