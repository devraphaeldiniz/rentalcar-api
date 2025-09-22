// src/vehicles/dto/create-vehicle.dto.ts
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

  @IsString()
  imagem: string;

  @IsNumber()
  precoAluguel: number;

  @IsEnum(VehicleStatus)
  @IsOptional()
  status?: VehicleStatus = VehicleStatus.AVAILABLE;
}
