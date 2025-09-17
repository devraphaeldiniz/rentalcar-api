import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:rootpassword@localhost:27017/', {
      dbName: 'rentalcar',
      authSource: 'admin',
    }),
    VehiclesModule,
  ],
})
export class AppModule {}
