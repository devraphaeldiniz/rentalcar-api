import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsUrl,
  Min,
  Max,
  Length,
} from 'class-validator';
import { VehicleStatus } from '../schemas/vehicle.schema';

export class CreateVehicleDto {
  @IsString({ message: 'O modelo deve ser uma string.' })
  @Length(2, 50, { message: 'O modelo deve ter entre 2 e 50 caracteres.' })
  modelo: string;

  @IsString({ message: 'A marca deve ser uma string.' })
  @Length(2, 50, { message: 'A marca deve ter entre 2 e 50 caracteres.' })
  marca: string;

  @IsNumber({}, { message: 'O ano deve ser um número.' })
  @Min(1950, { message: 'O ano deve ser maior que 1950.' })
  @Max(new Date().getFullYear() + 1, {
    message: 'O ano não pode ser maior que o próximo ano.',
  })
  ano: number;

  @IsNumber({}, { message: 'A potência deve ser um número.' })
  @Min(30, { message: 'A potência mínima é 30 cv.' })
  @Max(2000, { message: 'A potência máxima é 2000 cv.' })
  potencia: number;

  @IsString({ message: 'A categoria deve ser uma string.' })
  categoria: string;

  @IsString({ message: 'A imagem deve ser uma string (nome ou URL).' })
  @IsOptional()
  @IsUrl({}, { message: 'A imagem deve ser uma URL válida.' })
  imagem?: string;

  @IsNumber({}, { message: 'O preço de aluguel deve ser um número.' })
  @Min(1, { message: 'O preço de aluguel deve ser maior que 0.' })
  precoAluguel: number;

  @IsEnum(VehicleStatus, {
    message: 'O status deve ser "available", "rented" ou "maintenance".',
  })
  @IsOptional()
  status?: VehicleStatus = VehicleStatus.AVAILABLE;
}
