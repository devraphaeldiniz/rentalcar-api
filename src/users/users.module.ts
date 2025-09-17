import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // 🔹 importar controller

@Module({
  controllers: [UsersController], // 🔹 registrar controller
  providers: [UsersService],
  exports: [UsersService], // 🔹 Exporta para AuthModule
})
export class UsersModule {}
