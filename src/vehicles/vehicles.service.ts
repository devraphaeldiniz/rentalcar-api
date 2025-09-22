// src/vehicles/vehicles.service.ts
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
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<VehicleDocument>,
  ) {}

  /**
   * Converte um documento Mongoose em VehicleEntity tipado
   */
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

  /**
   * Cria um novo veículo
   */
  async create(createVehicleDto: CreateVehicleDto): Promise<VehicleEntity> {
    const created = new this.vehicleModel(createVehicleDto);
    const saved = await created.save();
    return this.toEntity(
      saved as unknown as VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date },
    );
  }

  /**
   * Cria múltiplos veículos de uma vez
   */
  async createBulk(createVehiclesDto: CreateVehicleDto[]): Promise<VehicleEntity[]> {
    const createdDocs = await this.vehicleModel.insertMany(createVehiclesDto);
    return createdDocs.map((v) =>
      this.toEntity(v as unknown as VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date }),
    );
  }

  /**
   * Retorna todos os veículos
   */
  async findAll(): Promise<VehicleEntity[]> {
    const vehicles = await this.vehicleModel.find().exec();
    return vehicles.map((v) =>
      this.toEntity(v as unknown as VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date }),
    );
  }

  /**
   * Retorna um veículo pelo ID
   */
  async findOne(id: string): Promise<VehicleEntity> {
    const vehicle = await this.vehicleModel.findById(id).exec();
    if (!vehicle) throw new NotFoundException(`Vehicle ${id} not found`);
    return this.toEntity(
      vehicle as unknown as VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date },
    );
  }

  /**
   * Atualiza um veículo pelo ID
   */
  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<VehicleEntity> {
    const updated = await this.vehicleModel
      .findByIdAndUpdate(id, updateVehicleDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Vehicle ${id} not found`);
    return this.toEntity(
      updated as unknown as VehicleDocument & { _id: any; createdAt: Date; updatedAt: Date },
    );
  }

  /**
   * Remove um veículo pelo ID
   */
  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.vehicleModel.findByIdAndDelete(id).exec();
    return { deleted: !!result };
  }
}
