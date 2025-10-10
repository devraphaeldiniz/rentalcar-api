// src/vehicles/dto/get-vehicles-query.dto.ts
import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { VehicleStatus } from '../schemas/vehicle.schema';

export class GetVehiclesQueryDto {
  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  anoMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  anoMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
