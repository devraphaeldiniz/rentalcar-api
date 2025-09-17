import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp'; // 🔹 Import default, corrige o erro TS

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    // Cria pastas se não existirem
    const originalDir = path.join(process.cwd(), 'uploads/original');
    const thumbsDir = path.join(process.cwd(), 'uploads/thumbs');
    if (!fs.existsSync(originalDir)) fs.mkdirSync(originalDir, { recursive: true });
    if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir, { recursive: true });

    // Configuração do multer
    req.fileOptions = {
      storage: diskStorage({
        destination: originalDir,
        filename: (_, file, cb) => {
          const filename = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    };

    return next.handle();
  }

  static async generateThumbnail(filePath: string, width = 300) {
    const thumbPath = filePath.replace('/original/', '/thumbs/');
    // 🔹 Uso do sharp corrigido
    await sharp(filePath).resize({ width }).toFile(thumbPath);
    return thumbPath;
  }
}
