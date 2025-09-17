import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; senha: string },
  ): Promise<{ access_token: string }> {
    const { email, senha } = body;
    return this.authService.login(email, senha);
  }
}
