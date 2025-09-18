# 🚗 RentalCar API – Checklist de Desenvolvimento

---

## 🟢 Feito
- [x] Inicialização do NestJS com TypeScript
- [x] Conexão com MongoDB (local ou Docker)
- [x] Entidade `UserEntity` e enum `UserRole`
- [x] DTO `CreateUserDto`
- [x] Serviço `UsersService` (CRUD básico em memória)
- [x] Controller `UsersController` (create user)
- [x] Serviço `VehiclesService`
- [x] Controller `VehiclesController` (upload e thumbnails)
- [x] Login com JWT
- [x] Refresh tokens em memória
- [x] Login com bcrypt
- [x] TOTP 2FA + QR Code
- [x] Testes de ponta a ponta (registro → login → TOTP → refresh)

---

## 🟡 Em andamento / Próximos
- [ ] Endpoint de registro completo com TOTP
- [ ] Armazenamento persistente de refresh tokens
- [ ] Expiração de refresh tokens
- [ ] Listagem de veículos
- [ ] Atualização de veículos
- [ ] Deleção de veículos
- [ ] Paginação e filtros de veículos
- [ ] Proteção de rotas com JWT guard
- [ ] Validação de dados (class-validator)
- [ ] Limitar tamanho de upload de arquivos

---

## 🔴 Futuro / Opcional
- [ ] Criar frontend ou consumir via Postman/Insomnia
- [ ] Documentação com Swagger ou Postman Collection
- [ ] Persistência de usuários e tokens no MongoDB
- [ ] Persistência de imagens no banco de dados
