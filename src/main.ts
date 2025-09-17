import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Ativa validação automática nos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos não definidos no DTO
      forbidNonWhitelisted: true, // gera erro se enviar campos extras
      transform: true, // transforma os tipos automaticamente (ex: string -> number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
