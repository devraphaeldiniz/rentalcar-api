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
  matricula?: string;
  role: UserRole; // 🔹 obrigatório
}
