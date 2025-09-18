import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';
import { randomBytes } from 'crypto';
import { authenticator } from 'otplib';
import * as qrcode from 'qrcode';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // 🔹 Login com JWT + Refresh + TOTP opcional
  async login(email: string, senha: string, totp?: string) {
    const user: UserEntity | undefined = this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) throw new UnauthorizedException('Credenciais inválidas');

    // 🔹 Verifica TOTP se estiver habilitado
    if (user.isTotpEnabled) {
      if (!totp) throw new UnauthorizedException('Código TOTP necessário');
      const isValid = authenticator.check(totp, user.totpSecret!);
      if (!isValid) throw new UnauthorizedException('Código TOTP inválido');
    }

    const payload = { sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = randomBytes(32).toString('hex');

    // 🔹 Salva o refresh token no próprio usuário
    user.refreshTokens = user.refreshTokens || [];
    user.refreshTokens.push(refresh_token);

    return { access_token, refresh_token };
  }

  // 🔹 Refresh token verifica no array do usuário
  async refreshToken(userId: string, refreshToken: string) {
    const user = this.usersService.findOne(userId);
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const tokens = user.refreshTokens || [];
    if (!tokens.includes(refreshToken))
      throw new UnauthorizedException('Refresh token inválido');

    const payload = { sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  // 🔹 Habilita TOTP para o usuário
  async enableTotp(userId: string) {
    const user = this.usersService.findOne(userId);
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const secret = authenticator.generateSecret();
    user.totpSecret = secret;
    user.isTotpEnabled = true;

    const otpAuthUrl = authenticator.keyuri(user.email, 'RentalCarApp', secret);
    return qrcode.toDataURL(otpAuthUrl); // Retorna QR Code em Base64
  }
}
