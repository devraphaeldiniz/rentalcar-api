# 🚗 RentalCar API – Checklist de Desenvolvimento

---

## 🟢 Feito
- [x] Inicialização do NestJS com TypeScript
- [x] Conexão com MongoDB (local ou Docker)
- [x] Entidade `UserEntity` e enum `UserRole`
- [x] DTO `CreateUserDto`
- [x] Serviço `UsersService` (CRUD básico em memória)
- [x] Controller `UsersController` (create user)
- [x] Serviço `VehiclesService` (CRUD completo com Mongoose, métodos testados)
- [x] Controller `VehiclesController` (create, findAll, findOne, update, remove)
- [x] Upload de imagens e thumbnails (planejado/implementação inicial)
- [x] Login com JWT
- [x] Refresh tokens em memória
- [x] Login com bcrypt
- [x] TOTP 2FA + QR Code
- [x] Testes de ponta a ponta via Postman (registro → login → TOTP → refresh → CRUD veículos)

---

## 🟡 Em andamento / Próximos
- [ ] Endpoint de registro completo com TOTP
- [ ] Armazenamento persistente de refresh tokens
- [ ] Expiração de refresh tokens
- [ ] Paginação e filtros de veículos
- [ ] Proteção de rotas com JWT guard
- [ ] Validação de dados (class-validator) mais refinada
- [ ] Limitar tamanho de upload de arquivos
- [ ] Testes unitários automáticos (jest)
- [ ] Upload de múltiplas imagens por veículo via endpoint `/vehicles/upload-multiple`

---

## 🔴 Futuro / Opcional
- [ ] Criar frontend ou consumir via Postman/Insomnia
- [ ] Documentação com Swagger ou Postman Collection
- [ ] Persistência de usuários e tokens no MongoDB
- [ ] Persistência de imagens no banco de dados
