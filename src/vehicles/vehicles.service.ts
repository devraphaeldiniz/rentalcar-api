// src/vehicles/vehicles.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument, VehicleStatus } from './schemas/vehicle.schema';
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

  private toEntity(
    vehicle: VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date },
  ): VehicleEntity {
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
    const created = new this.vehicleModel(createVehicleDto);
    const saved = await created.save();
    return this.toEntity(
      saved as unknown as VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date },
    );
  }

  async createBulk(createVehiclesDto: CreateVehicleDto[]): Promise<VehicleEntity[]> {
    const createdDocs = await this.vehicleModel.insertMany(createVehiclesDto);
    return createdDocs.map((v) =>
      this.toEntity(v as unknown as VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date }),
    );
  }

  async findAll(query: GetVehiclesQueryDto): Promise<{ data: VehicleEntity[]; total: number; page: number; limit: number }> {
    const { marca, categoria, status, page = 1, limit = 10 } = query;

    const filter: any = {};
    if (marca) filter.marca = marca;
    if (categoria) filter.categoria = categoria;
    if (status) filter.status = status;

    const total = await this.vehicleModel.countDocuments(filter).exec();

    const vehicles = await this.vehicleModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data: vehicles.map((v) =>
        this.toEntity(v as unknown as VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date }),
      ),
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<VehicleEntity> {
    const vehicle = await this.vehicleModel.findById(id).exec();
    if (!vehicle) throw new NotFoundException(`Vehicle ${id} not found`);
    return this.toEntity(vehicle as unknown as VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date });
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<VehicleEntity> {
    const updated = await this.vehicleModel
      .findByIdAndUpdate(id, updateVehicleDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Vehicle ${id} not found`);
    return this.toEntity(updated as unknown as VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date });
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.vehicleModel.findByIdAndDelete(id).exec();
    return { deleted: !!result };
  }
}
