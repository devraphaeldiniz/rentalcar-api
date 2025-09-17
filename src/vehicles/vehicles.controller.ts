import { Controller, Post, UploadedFiles, UseInterceptors, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './schemas/vehicle.schema';
import * as path from 'path';
import * as fs from 'fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 5, { // até 5 arquivos
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
  }))
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: Partial<Vehicle>
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

      // Gera thumbnail em WebP
      await sharp(file.path)
        .resize({ width: 300 })
        .toFormat('webp')
        .toFile(thumbPath);

      thumbnails.push(thumbFilename); // Salva apenas o nome do thumbnail
    }

    const vehicleData = {
      ...body,
      imagens: thumbnails, // apenas thumbnails
    };

    return this.vehiclesService.create(vehicleData);
  }
}
