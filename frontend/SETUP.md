# Configuração do Frontend

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto frontend com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Executando o Projeto

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   - Criar arquivo `.env.local` com a URL da API

3. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acessar a aplicação:**
   - Abrir http://localhost:3000
   - Fazer login com as credenciais configuradas no backend

## Credenciais de Teste

Use as credenciais configuradas no backend:
- **Usuário:** admin
- **Senha:** admin123

## Funcionalidades Disponíveis

- ✅ Dashboard com tabela de feature flags
- ✅ Criação de novas flags
- ✅ Edição de flags existentes
- ✅ Toggle de status (ativo/inativo)
- ✅ Exclusão de flags
- ✅ Confirmação de ações críticas
- ✅ Autenticação básica
- ✅ Interface responsiva

## Estrutura de Arquivos

```
frontend/
├── src/
│   ├── app/              # Páginas (Next.js App Router)
│   ├── components/       # Componentes reutilizáveis
│   ├── contexts/         # Contextos React
│   ├── hooks/           # Hooks customizados
│   ├── services/        # Serviços de API
│   ├── types/           # Definições TypeScript
│   └── __tests__/       # Testes
├── public/              # Arquivos estáticos
├── jest.config.js       # Configuração do Jest
├── jest.setup.js        # Setup dos testes
└── package.json         # Dependências e scripts
```
