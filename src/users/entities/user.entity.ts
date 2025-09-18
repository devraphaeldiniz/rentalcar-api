export enum UserRole {
  Cliente = 'cliente',
  Vendedor = 'vendedor',
  Administrador = 'administrador',
  Fiscal = 'fiscal',
}

export interface UserEntity {
  id: string;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  endereco?: string;
  role: UserRole;
  // 🔹 Adicionar campos para autenticação
  totpSecret?: string;
  isTotpEnabled?: boolean;
  refreshTokens?: string[]; // 🔹 Tipagem correta do array
}

