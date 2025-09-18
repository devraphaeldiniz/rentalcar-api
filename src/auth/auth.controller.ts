import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔹 Login com email, senha e TOTP opcional
  @Post('login')
  async login(@Body() body: { email: string; senha: string; totp?: string }) {
    const { email, senha, totp } = body;
    return this.authService.login(email, senha, totp);
  }

  // 🔹 Refresh token
  @Post('refresh')
  async refresh(@Body() body: { userId: string; refreshToken: string }) {
    const { userId, refreshToken } = body;
    return this.authService.refreshToken(userId, refreshToken);
  }

  // 🔹 Habilitar TOTP
  @Post('enable-totp')
  async enableTotp(@Body() body: { userId: string }) {
    const { userId } = body;
    const qrCodeBase64 = await this.authService.enableTotp(userId);
    return { qrCode: qrCodeBase64 };
  }
}
