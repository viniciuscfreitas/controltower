# ControlTower Frontend

Painel administrativo para gerenciamento de feature flags, desenvolvido com Next.js, TypeScript e Material-UI.

## 🚀 Funcionalidades

- **Dashboard Principal**: Visualização de todas as feature flags em uma tabela responsiva
- **Criação/Edição de Flags**: Modal com formulário validado para gerenciar flags
- **Confirmação de Ações**: Modal de confirmação para ações críticas (toggle/delete)
- **Autenticação**: Sistema de login com HTTP Basic Auth
- **Gerenciamento de Estado**: Cache inteligente com React Query
- **UI/UX Profissional**: Interface intuitiva com Material-UI

## 🛠️ Tech Stack

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Material-UI** - Componentes de interface
- **React Query** - Gerenciamento de estado do servidor
- **Axios** - Cliente HTTP
- **Jest + React Testing Library** - Testes

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com a URL da API

# Executar em desenvolvimento
npm run dev
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run test         # Executar testes
npm run test:watch   # Testes em modo watch
npm run test:coverage # Testes com cobertura
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/                 # App Router (Next.js 13+)
│   ├── login/          # Página de login
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Dashboard principal
├── components/         # Componentes reutilizáveis
│   ├── FlagTable.tsx   # Tabela de flags
│   ├── FlagModal.tsx   # Modal de criação/edição
│   ├── ConfirmationModal.tsx # Modal de confirmação
│   └── ProtectedRoute.tsx    # Proteção de rotas
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── hooks/              # Hooks customizados
│   └── useFlags.ts     # Hooks para feature flags
├── services/           # Serviços de API
│   └── api.ts          # Cliente Axios
├── types/              # Definições TypeScript
│   ├── flag.ts         # Tipos de feature flags
│   └── auth.ts         # Tipos de autenticação
└── __tests__/          # Testes
    ├── FlagTable.test.tsx
    └── FlagModal.test.tsx
```

## 🔐 Autenticação

O sistema utiliza HTTP Basic Auth. As credenciais são armazenadas no localStorage e enviadas automaticamente nas requisições.

## 🎨 Design System

- **Material-UI**: Componentes consistentes e acessíveis
- **Tema Customizado**: Cores e tipografia personalizadas
- **Responsivo**: Interface adaptável para diferentes dispositivos
- **Acessibilidade**: Componentes com suporte a screen readers

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:coverage
```

## 🚀 Deploy

```bash
# Build de produção
npm run build

# Servidor de produção
npm run start
```

## 📝 Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.