import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { VehicleStatus } from '../schemas/vehicle.schema';

export class CreateVehicleDto {
  @IsString()
  modelo: string;

  @IsString()
  marca: string;

  @IsNumber()
  ano: number;

  @IsNumber()
  potencia: number;

  @IsString()
  categoria: string;

  @IsNumber()
  precoAluguel: number;

  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;
}
