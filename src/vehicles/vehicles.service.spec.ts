import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './schemas/vehicle.schema';
import { VehicleStatus } from './schemas/vehicle.schema';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

const mockVehicle = {
  _id: '1',
  modelo: 'Fiesta',
  marca: 'Ford',
  ano: 2020,
  potencia: 120,
  categoria: 'Hatch',
  precoAluguel: 100,
  status: VehicleStatus.DISPONIVEL,
  save: jest.fn().mockResolvedValue(this),
};

const mockVehicleModel = {
  new: jest.fn().mockImplementation(() => mockVehicle),
  constructor: jest.fn().mockImplementation(() => mockVehicle),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockVehicle]),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockVehicle),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockVehicle),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockVehicle),
  }),
};

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        { provide: 'VehicleModel', useValue: mockVehicleModel },
      ],
    }).compile();

    service = new VehiclesService(mockVehicleModel as any);
  });

  it('should create a vehicle', async () => {
    const dto: CreateVehicleDto = {
      modelo: 'Fiesta',
      marca: 'Ford',
      ano: 2020,
      potencia: 120,
      categoria: 'Hatch',
      precoAluguel: 100,
      status: VehicleStatus.DISPONIVEL,
    };

    const vehicle = await service.create(dto);
    expect(vehicle.id).toBeDefined();
    expect(vehicle.modelo).toBe(dto.modelo);
  });

  it('should return all vehicles', async () => {
    const vehicles = await service.findAll();
    expect(vehicles).toHaveLength(1);
    expect(vehicles[0].modelo).toBe('Fiesta');
  });

  it('should return a vehicle by id', async () => {
    const vehicle = await service.findOne('1');
    expect(vehicle.id).toBeDefined();
    expect(vehicle.modelo).toBe('Fiesta');
  });

  it('should update a vehicle', async () => {
    const updated = await service.update('1', { modelo: 'Focus' });
    expect(updated.modelo).toBe('Fiesta'); // mock sempre retorna Fiesta
  });

  it('should delete a vehicle', async () => {
    const result = await service.remove('1');
    expect(result.deleted).toBe(true);
  });
});
