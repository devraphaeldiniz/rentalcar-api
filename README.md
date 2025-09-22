
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
git clone https://github.com/devraphaeldiniz/rentalcar-api
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
    "totp": "123456"
  }
  ```

  Retorna:

  ```json
  {
    "access_token": "...",
    "refresh_token": "..."
  }
  ```

* **POST /auth/refresh** - Atualiza o access_token usando o refresh token.

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

* **POST /vehicles** - Cria um novo veículo.

  ```json
  {
    "modelo": "Civic",
    "marca": "Honda",
    "ano": 2022,
    "potencia": "140",
    "categoria": "Sedan",
    "imagem": "civic.jpg",
    "precoAluguel": 150,
    "status": "available"
  }
  ```

* **GET /vehicles** - Lista todos os veículos
* **GET /vehicles/:id** - Busca veículo pelo ID
* **PUT /vehicles/:id** - Atualiza veículo pelo ID
* **DELETE /vehicles/:id** - Remove veículo pelo ID
* **POST /vehicles/upload-multiple** - Faz upload de até 5 imagens, gera thumbnails e cria veículo

  * `multipart/form-data` com campos:
    * `files`: arquivos de imagem
    * demais campos do veículo no corpo (ex: modelo, marca, ano)

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
