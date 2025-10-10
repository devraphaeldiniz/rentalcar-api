// src/vehicles/vehicles.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { GetVehiclesQueryDto } from './dto/get-vehicles-query.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<VehicleDocument>,
  ) {}

  private toEntity(vehicle: VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date }): VehicleEntity {
    return {
      id: vehicle._id.toString(),
      modelo: vehicle.modelo,
      marca: vehicle.marca,
      ano: vehicle.ano,
      potencia: vehicle.potencia,
      categoria: vehicle.categoria,
      imagem: vehicle.imagem,
      precoAluguel: vehicle.precoAluguel,
      status: vehicle.status,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    };
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<VehicleEntity> {
    try {
      const created = new this.vehicleModel(createVehicleDto);
      const saved = await created.save();
      return this.toEntity(saved as any);
    } catch (error) {
      throw new BadRequestException(`Erro ao criar veículo: ${error.message}`);
    }
  }

  async createBulk(createVehiclesDto: CreateVehicleDto[]): Promise<VehicleEntity[]> {
    try {
      const createdDocs = await this.vehicleModel.insertMany(createVehiclesDto);
      return createdDocs.map((v) => this.toEntity(v as any));
    } catch (error) {
      throw new BadRequestException(`Erro ao criar veículos em massa: ${error.message}`);
    }
  }

  async findAll(query: GetVehiclesQueryDto): Promise<{
    data: VehicleEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { marca, categoria, status, modelo, anoMin, anoMax, page = 1, limit = 10 } = query;

    const filter: any = {};

    if (marca) filter.marca = new RegExp(marca, 'i');
    if (modelo) filter.modelo = new RegExp(modelo, 'i');
    if (categoria) filter.categoria = categoria;
    if (status) filter.status = status;
    if (anoMin || anoMax) {
      filter.ano = {};
      if (anoMin) filter.ano.$gte = anoMin;
      if (anoMax) filter.ano.$lte = anoMax;
    }

    const total = await this.vehicleModel.countDocuments(filter).exec();

    const vehicles = await this.vehicleModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data: vehicles.map((v) => this.toEntity(v as any)),
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<VehicleEntity> {
    const vehicle = await this.vehicleModel.findById(id).exec();
    if (!vehicle) throw new NotFoundException(`Veículo ${id} não encontrado`);
    return this.toEntity(vehicle as any);
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<VehicleEntity> {
    const updated = await this.vehicleModel
      .findByIdAndUpdate(id, updateVehicleDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException(`Veículo ${id} não encontrado`);
    return this.toEntity(updated as any);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.vehicleModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Veículo ${id} não encontrado`);
    return { deleted: true };
  }
}
