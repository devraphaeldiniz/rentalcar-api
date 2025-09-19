import { VehicleStatus } from '../schemas/vehicle.schema';

export interface VehicleEntity {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  potencia: number;
  categoria: string;
  precoAluguel: number;
  status: VehicleStatus;
}
