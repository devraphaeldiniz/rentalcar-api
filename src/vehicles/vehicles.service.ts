import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  private mapToEntity(vehicle: VehicleDocument): VehicleEntity {
    return {
      id: vehicle.id.toString(),
      modelo: vehicle.modelo,
      marca: vehicle.marca,
      ano: vehicle.ano,
      potencia: vehicle.potencia,
      categoria: vehicle.categoria,
      precoAluguel: vehicle.precoAluguel,
      status: vehicle.status,
    };
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<VehicleEntity> {
    const vehicle = new this.vehicleModel(createVehicleDto);
    await vehicle.save();
    return this.mapToEntity(vehicle);
  }

  async findAll(): Promise<VehicleEntity[]> {
    const vehicles = await this.vehicleModel.find().exec();
    return vehicles.map(this.mapToEntity);
  }

  async findOne(id: string): Promise<VehicleEntity> {
    const vehicle = await this.vehicleModel.findById(id).exec();
    if (!vehicle) throw new NotFoundException('Veículo não encontrado');
    return this.mapToEntity(vehicle);
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<VehicleEntity> {
    const updated = await this.vehicleModel
      .findByIdAndUpdate(id, updateVehicleDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Veículo não encontrado');
    return this.mapToEntity(updated);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.vehicleModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Veículo não encontrado');
    return { deleted: true };
  }
}
