# ControlTower 🚀

Sistema de Feature Flags para startups que precisam de agilidade no lançamento de funcionalidades.

## 📋 Sobre o Projeto

O ControlTower é uma aplicação web fullstack que permite gerenciar feature flags de forma dinâmica, desacoplando o lançamento de funcionalidades do deploy de código. Isso permite que equipes de produto validem hipóteses em produção com segurança.

## 🎯 Problema Resolvido

- **Deploy lento e arriscado**: Processo "tudo ou nada" que atrasa lançamentos
- **Falta de agilidade**: Dependência de desenvolvedores para habilitar/desabilitar features
- **Validação de hipóteses**: Necessidade de testar funcionalidades em produção com segurança

## 👥 Usuário-Alvo

**Mariana, 30 anos, Product Manager** - Interface visual simples para gerenciar flags sem conhecimento técnico.

## 🏗️ Arquitetura

### Backend (Java Spring Boot)
- **Framework**: Spring Boot 3.2.0
- **Banco de Dados**: PostgreSQL
- **ORM**: Spring Data JPA
- **Segurança**: Spring Security (Basic Auth)
- **Validação**: Bean Validation

### Frontend (Próxima Fase)
- **Framework**: Next.js + Shadcn/ui
- **Estado**: Zustand
- **Requisições**: Axios
- **Validação**: Zod

## 🚀 Funcionalidades (MVP 1.0)

### Painel de Controle
- ✅ Listar todas as flags existentes
- ✅ Criar nova flag (nome + descrição)
- ✅ Alternar estado (ATIVO/INATIVO) com modal de confirmação
- ✅ Editar flag (nome + descrição)
- ✅ Deletar flag com modal de confirmação

### API RESTful
- `POST /admin/flags` - Criar flag
- `GET /admin/flags` - Listar flags
- `PATCH /admin/flags/{name}` - Atualizar estado
- `PUT /admin/flags/{name}` - Atualizar dados
- `DELETE /admin/flags/{name}` - Deletar flag
- `GET /api/v1/flags/active` - Flags ativas (público, < 50ms)

## 📊 Requisitos Não-Funcionais

- **Performance**: Endpoint público deve responder em < 50ms
- **Segurança**: Endpoints `/admin/*` protegidos por autenticação básica
- **Qualidade**: Código profissional com testes e documentação

## 🛠️ Tecnologias

- **Backend**: Java 17, Spring Boot 3.2.0, PostgreSQL, JPA
- **Frontend**: Next.js, TypeScript, Shadcn/ui (planejado)
- **DevOps**: Docker, Maven
- **Testes**: JUnit 5, TestContainers

## 📁 Estrutura do Projeto

```
controltower/
├── src/main/java/com/controltower/
│   ├── ControlTowerApplication.java
│   ├── entity/
│   │   └── FeatureFlag.java
│   └── repository/
│       └── FeatureFlagRepository.java
├── src/main/resources/
│   ├── application.properties
│   └── schema.sql
├── pom.xml
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Java 17+
- Maven 3.6+
- PostgreSQL 13+

### Configuração do Banco
```sql
CREATE DATABASE controltower;
CREATE USER controltower WITH PASSWORD 'controltower123';
GRANT ALL PRIVILEGES ON DATABASE controltower TO controltower;
```

### Executar a Aplicação
```bash
# Clonar o repositório
git clone <repository-url>
cd controltower

# Executar com Maven
mvn spring-boot:run
```

A aplicação estará disponível em: `http://localhost:8080`

## 🔐 Autenticação

- **Usuário**: admin
- **Senha**: admin123
- **Escopo**: Apenas endpoints `/admin/*`

## 📈 Métricas de Sucesso

- ✅ Repositório público no GitHub com código de qualidade
- ✅ Aplicação funcional e acessível via URL pública
- ✅ Base sólida para discussões de Arquitetura e System Design
- ✅ Projeto-vitrine para crescimento profissional

## 🗺️ Roadmap

### V1.0 (MVP Atual)
- [x] Fundação do projeto
- [ ] API Backend completa
- [ ] Frontend administrativo
- [ ] Deploy e documentação

### V2.0 (Futuro)
- Sistema de múltiplos usuários
- Logs de auditoria detalhados
- Flags baseadas em porcentagem de usuários
- SDKs para outras linguagens
- WebSockets para atualização em tempo real

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

---

**ControlTower** - Desenvolvido com ❤️ para acelerar o desenvolvimento de startups.
