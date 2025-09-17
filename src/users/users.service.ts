import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];

  // Cria usuário com senha criptografada
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);
    const newUser: UserEntity = {
      id: Date.now().toString(),
      role: createUserDto.role ?? UserRole.Cliente,
      ...createUserDto,
      senha: hashedPassword, // senha já criptografada
    };
    this.users.push(newUser);
    return newUser;
  }

  // Retorna todos os usuários
  findAll(): UserEntity[] {
    return this.users;
  }

  // Busca usuário por ID
  findOne(id: string): UserEntity | undefined {
    return this.users.find((user) => user.id === id);
  }

  // Busca usuário por email
  findByEmail(email: string): UserEntity | undefined {
    return this.users.find((user) => user.email === email);
  }

  // Valida senha de login
  async validateUser(email: string, senha: string): Promise<UserEntity | null> {
    const user = this.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) return null;

    return user;
  }
}
