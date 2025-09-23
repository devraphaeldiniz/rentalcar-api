// src/vehicles/dto/filter-vehicle.dto.ts
import { IsOptional, IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { VehicleStatus } from '../schemas/vehicle.schema';

export class FilterVehicleDto {
  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  ano?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precoMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precoMax?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}
