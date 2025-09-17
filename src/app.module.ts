import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiclesModule } from './vehicles/vehicles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 🔹 Conexão com MongoDB
    MongooseModule.forRoot('mongodb://root:rootpassword@localhost:27017/', {
      dbName: 'rentalcar',
      authSource: 'admin',
    }),

    // 🔹 Módulos da aplicação
    VehiclesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
