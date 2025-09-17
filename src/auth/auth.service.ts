import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Login com validação de senha criptografada
  async login(email: string, senha: string) {
    console.log('[AuthService] Tentando login com email:', email);

    // 🔹 Usando o validateUser do UsersService
    const user: UserEntity | null = await this.usersService.validateUser(email, senha);

    if (!user) {
      console.log('[AuthService] Credenciais inválidas');
      throw new UnauthorizedException('Credenciais inválidas');
    }

    console.log('[AuthService] Login bem-sucedido para usuário:', user.id);

    const payload = { sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
