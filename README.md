# RentalCar API

## Descrição

Este projeto é uma API construída com **NestJS** que permite gerenciar usuários e veículos de uma plataforma de aluguel e venda de carros. A API possui autenticação JWT, refresh tokens e suporte a TOTP (2FA).

## Tecnologias Utilizadas

* NestJS
* TypeScript
* MongoDB (com Mongoose)
* Docker (opcional para MongoDB)
* bcrypt (para hash de senhas)
* JWT (Json Web Token)
* otplib (para TOTP)
* QRCode (geração de QR Code para TOTP)
* Sharp (manipulação de imagens)

## Instalação

1. Clone o repositório:

```bash
git clone <repo-url>
cd rentalcar-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o MongoDB:

* Usando Docker:

```bash
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=rootpassword mongo
```

* Ou instale MongoDB localmente e configure em `AppModule`.

4. Rode a aplicação:

```bash
npm run start:dev
```

## Estrutura do Projeto

```
src/
  auth/
    auth.controller.ts
    auth.service.ts
  users/
    users.controller.ts
    users.service.ts
    dto/
      create-user.dto.ts
    entities/
      user.entity.ts
  vehicles/
    vehicles.controller.ts
    vehicles.service.ts
    schemas/
      vehicle.schema.ts
  app.module.ts
```

## Endpoints

### Usuários

* **POST /users** - Cria um novo usuário.

  ```json
  {
    "nome": "Raphael Diniz",
    "email": "raphael@test.com",
    "senha": "123456",
    "cpf": "12345678900",
    "endereco": "Rua Exemplo, 123"
  }
  ```

### Auth

* **POST /auth/login** - Login do usuário com JWT e TOTP opcional.

  ```json
  {
    "email": "raphael@test.com",
    "senha": "123456",
    "totp": "123456" // opcional se TOTP habilitado
  }
  ```

  Retorna:

  ```json
  {
    "access_token": "...",
    "refresh_token": "..."
  }
  ```

* **POST /auth/refresh** - Atualiza o access\_token usando o refresh token.

  ```json
  {
    "userId": "<user-id>",
    "refreshToken": "<refresh-token>"
  }
  ```

  Retorna:

  ```json
  {
    "access_token": "..."
  }
  ```

* **POST /auth/enable-totp** - Habilita TOTP para o usuário e retorna QR Code em Base64.

  ```json
  {
    "userId": "<user-id>"
  }
  ```

### Veículos

* **POST /vehicles/upload-multiple** - Faz upload de até 5 imagens, gera thumbnails e cria veículo.

  * `multipart/form-data` com campos:

    * `files`: arquivos de imagem
    * demais campos do veículo no corpo (ex: modelo, marca, ano)

## Fluxo de Autenticação

```mermaid
flowchart TD
    A[Usuário] -->|POST /auth/login| B[AuthService]
    B --> C{Usuário existe?}
    C -- Não --> D[Erro: Credenciais inválidas]
    C -- Sim --> E[Verifica senha com bcrypt]
    E --> F{Senha correta?}
    F -- Não --> D
    F -- Sim --> G{TOTP habilitado?}
    G -- Sim --> H[Verifica código TOTP]
    H --> I{Código válido?}
    I -- Não --> D
    I -- Sim --> J[Gera JWT e Refresh Token]
    G -- Não --> J
    J --> K[Retorna {access_token, refresh_token}]

    L[Usuário] -->|POST /auth/refresh| M[AuthService]
    M --> N{Refresh token válido?}
    N -- Não --> D
    N -- Sim --> O[Gera novo access_token]
    O --> P[Retorna novo access_token]
```

## Testando a API

1. **Criar usuário:** POST /users
2. **Login:** POST /auth/login
3. **Receber tokens:** Guardar `access_token` e `refresh_token`
4. **Refresh token:** POST /auth/refresh usando `userId` e `refresh_token`
5. **Ativar TOTP:** POST /auth/enable-totp e usar código TOTP para próximos logins

## Observações

* Senhas são armazenadas de forma segura com **bcrypt**.
* Refresh tokens são gerenciados por usuário, podendo existir múltiplos válidos.
* TOTP é opcional, mas recomendado para segurança adicional.
* Upload de imagens gera thumbnails automáticos em WebP.

## Executando Testes

* Utilize ferramentas como **Postman** ou **Insomnia**.
* Para endpoints que exigem `application/json`, configure o `Content-Type`.
* Para upload de arquivos, use `multipart/form-data`.

---

**Desenvolvido por Raphael Aloisio Diniz**
