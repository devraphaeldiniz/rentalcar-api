import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  async create(data: Partial<Vehicle>): Promise<Vehicle> {
    const created = new this.vehicleModel(data);
    return created.save();
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findById(id).exec();
    if (!vehicle) throw new NotFoundException('Veículo não encontrado');
    return vehicle;
  }

  async update(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    const updated = await this.vehicleModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Veículo não encontrado');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.vehicleModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Veículo não encontrado');
  }
}
