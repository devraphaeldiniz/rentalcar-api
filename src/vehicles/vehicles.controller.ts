import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './schemas/vehicle.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vehicles')
@UseGuards(JwtAuthGuard)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post('upload-multiple')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(process.cwd(), 'uploads/original');
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: Partial<Vehicle>,
  ): Promise<Vehicle> {
    if (!files || files.length === 0) {
      throw new Error('Nenhum arquivo enviado');
    }

    const thumbsDir = path.join(process.cwd(), 'uploads/thumbs');
    fs.mkdirSync(thumbsDir, { recursive: true });

    const thumbnails: string[] = [];

    for (const file of files) {
      const thumbFilename = file.filename.replace(path.extname(file.filename), '.webp');
      const thumbPath = path.join(thumbsDir, thumbFilename);

      await sharp(file.path)
        .resize({ width: 300 })
        .toFormat('webp')
        .toFile(thumbPath);

      thumbnails.push(thumbFilename);
    }

    const vehicleData = {
      ...body,
      imagens: thumbnails,
    };

    return this.vehiclesService.create(vehicleData);
  }

  @Get()
  async findAll(): Promise<Vehicle[]> {
    return await this.vehiclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vehicle> {
    return await this.vehiclesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Vehicle>): Promise<Vehicle> {
    return await this.vehiclesService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.vehiclesService.remove(id);
    return { deleted: true };
  }
}
