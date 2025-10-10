// src/vehicles/vehicles.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { GetVehiclesQueryDto } from './dto/get-vehicles-query.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<VehicleEntity> {
    try {
      return await this.vehiclesService.create(createVehicleDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Erro ao criar veículo', details: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('bulk')
  async createBulk(@Body() createVehiclesDto: CreateVehicleDto[]): Promise<VehicleEntity[]> {
    try {
      return await this.vehiclesService.createBulk(createVehiclesDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Erro ao criar veículos em massa', details: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(@Query() query: GetVehiclesQueryDto) {
    try {
      return await this.vehiclesService.findAll(query);
    } catch (error) {
      throw new HttpException(
        { message: 'Erro ao buscar veículos', details: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VehicleEntity> {
    const vehicle = await this.vehiclesService.findOne(id);
    if (!vehicle) {
      throw new HttpException('Veículo não encontrado', HttpStatus.NOT_FOUND);
    }
    return vehicle;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleEntity> {
    try {
      const updated = await this.vehiclesService.update(id, updateVehicleDto);
      if (!updated) {
        throw new HttpException('Veículo não encontrado', HttpStatus.NOT_FOUND);
      }
      return updated;
    } catch (error) {
      throw new HttpException(
        { message: 'Erro ao atualizar veículo', details: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    try {
      return await this.vehiclesService.remove(id);
    } catch (error) {
      throw new HttpException(
        { message: 'Erro ao remover veículo', details: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
