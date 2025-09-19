import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './schemas/vehicle.schema';
import { VehicleStatus } from './schemas/vehicle.schema';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let model: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: getModelToken(Vehicle.name),
          useValue: {
            new: jest.fn().mockResolvedValue({ save: jest.fn() }),
            constructor: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    model = module.get(getModelToken(Vehicle.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a vehicle', async () => {
    const dto: CreateVehicleDto = {
      modelo: 'Gol',
      marca: 'VW',
      ano: 2023,
      potencia: 120,
      categoria: 'Hatch',
      precoAluguel: 200,
      status: VehicleStatus.DISPONIVEL,
    };

    model.prototype.save = jest.fn().mockResolvedValue({
      _id: '123',
      ...dto,
    });

    const vehicle = await service.create(dto);
    expect(vehicle.id).toBe('123');
    expect(vehicle.modelo).toBe(dto.modelo);
  });
});
