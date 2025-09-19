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
    return await this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  async findAll(): Promise<VehicleEntity[]> {
    return await this.vehiclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VehicleEntity> {
    return await this.vehiclesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleEntity> {
    return await this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return await this.vehiclesService.remove(id);
  }
}
