// src/vehicles/vehicles.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<VehicleEntity> {
    return this.vehiclesService.create(createVehicleDto);
  }

  // Novo endpoint para criar vários veículos de uma vez
  @Post('bulk')
  async createBulk(@Body() createVehiclesDto: CreateVehicleDto[]): Promise<VehicleEntity[]> {
    return this.vehiclesService.createBulk(createVehiclesDto);
  }

  @Get()
  async findAll(): Promise<VehicleEntity[]> {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VehicleEntity> {
    return this.vehiclesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleEntity> {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.vehiclesService.remove(id);
  }
}
