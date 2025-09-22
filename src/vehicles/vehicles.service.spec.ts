// ...
import { VehicleStatus } from './schemas/vehicle.schema';

// exemplo de uso corrigido:
const mockVehicle = {
  modelo: 'Civic',
  marca: 'Honda',
  ano: 2020,
  potencia: '155cv',   // precisa ser string
  categoria: 'Sedan',
  imagem: 'civic.jpg',
  precoAluguel: 200,
  status: VehicleStatus.AVAILABLE, // corrigido
};
