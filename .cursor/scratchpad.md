# ControlTower - Deploy no Fly.io com Dockerfile

## Background
O usuário está tentando fazer deploy da aplicação Spring Boot no Fly.io, mas o `flyctl` não conseguiu detectar automaticamente o framework. A solução é criar um `Dockerfile` explícito para controlar o processo de build e deploy.

## Análise
O problema de detecção automática é comum e a solução profissional é usar um `Dockerfile` multi-estágio que documenta explicitamente como construir e executar a aplicação. Isso oferece mais controle e é uma prática padrão da indústria.

## High-level Task Breakdown

1. **Cancelar fly launch atual** - Responder "N" para cancelar o processo
2. **Criar Dockerfile** - Dockerfile multi-estágio para Spring Boot
3. **Executar fly launch novamente** - Com Dockerfile detectado
4. **Configurar secrets** - Variáveis de ambiente para produção
5. **Fazer deploy** - Deploy da aplicação no Fly.io

## Implementação da Solução com Profiles

### Estrutura de Arquivos Necessária:
```
src/main/resources/
├── application.properties          # Configurações comuns + spring.profiles.active=dev
├── application-dev.properties      # Configuração local (localhost)
└── application-prod.properties     # Configuração produção (Supabase)
```

### Benefícios da Abordagem:
- ✅ **Desenvolvimento local funcional** - Aplicação roda com banco local
- ✅ **Deploy em produção funcional** - Aplicação conecta ao Supabase
- ✅ **Mesma base de código** - Sem alterações manuais entre ambientes
- ✅ **Padrão da indústria** - Configuração profissional e escalável

## Implementação Concluída ✅

### Arquivos Criados:
1. **`application.properties`** - Configurações comuns + `spring.profiles.active=dev`
2. **`application-dev.properties`** - Configuração local (localhost PostgreSQL)
3. **`application-prod.properties`** - Configuração produção (Supabase via variáveis de ambiente)

### Testes Realizados:
- ✅ **Teste Local**: `mvn spring-boot:run` - **SUCESSO**
- ✅ **Health Check**: `curl localhost:8080/actuator/health` → `{"status":"UP"}`
- ✅ **API Test**: `curl localhost:8080/api/v1/flags/active` → `[]` (resposta válida)

### Configuração para Produção:
Para fazer deploy no Fly.io, você precisa configurar a variável de ambiente:
```bash
fly secrets set SPRING_PROFILES_ACTIVE=prod
```

### Variáveis de Ambiente Necessárias no Fly.io:
- `JDBC_DATABASE_URL` - URL do Supabase
- `JDBC_DATABASE_USERNAME` - Usuário do Supabase  
- `JDBC_DATABASE_PASSWORD` - Senha do Supabase
- `ADMIN_USERNAME` - (opcional, padrão: admin)
- `ADMIN_PASSWORD` - (opcional, padrão: admin123)

## Progress Tracking
- [x] Ler configuração atual
- [x] Criar application-dev.properties
- [x] Criar application-prod.properties
- [x] Atualizar application.properties
- [x] Testar configuração local
- [x] Verificar preparação para produção

## Diagnóstico de Crash Loop - Correção de URL de Banco

### Problema Identificado:
A aplicação está em crash loop devido a erro na URL de conexão com o banco de dados. O driver PostgreSQL JDBC não aceita URLs sem o prefixo `jdbc:`.

### URL Atual (Incorreta):
```
postgresql://postgres:Controltower-prod@db.vssxqnkfswdhpsczsmyq.supabase.co:5432/postgres
```

### URL Corrigida (Necessária):
```
jdbc:postgresql://postgres:Controltower-prod@db.vssxqnkfswdhpsczsmyq.supabase.co:5432/postgres
```

### Comando de Correção:
```bash
fly secrets set JDBC_DATABASE_URL="jdbc:postgresql://postgres:Controltower-prod@db.vssxqnkfswdhpsczsmyq.supabase.co:5432/postgres"
```

### Status da Correção:
- ✅ **URL corrigida** - Adicionado prefixo `jdbc:` 
- ✅ **Secret atualizado** - Comando executado com sucesso
- ❌ **Erro persiste** - Aplicação ainda não conecta ao banco

### Novo Erro Identificado:
```
java.net.UnknownHostException: postgres:Senharealsupabase@@@db.vssxqnkfswdhpsczsmyq.supabase.co
```

**Análise:** O driver está interpretando a URL incorretamente. O problema é que a URL está sendo parseada como hostname, indicando que a formatação ainda está incorreta.

### Problema Identificado:
A senha `Senharealsupabase@@` contém caracteres especiais (`@`) que precisam ser codificados na URL. O `@` é um caractere especial em URLs e precisa ser codificado como `%40`.

### Próximos Passos:
1. Codificar a senha na URL: `Senharealsupabase@@` → `Senharealsupabase%40%40`
2. Atualizar o secret com a URL corrigida
3. Testar a conexão

### Status da Codificação:
- ✅ **Senha codificada** - `@` → `%40`
- ✅ **Secret atualizado** - URL com senha codificada
- ❌ **Erro persiste** - Ainda interpreta como hostname

### Novo Erro:
```
java.net.UnknownHostException: postgres:Senharealsupabase%40%40@db.vssxqnkfswdhpsczsmyq.supabase.co
```

**Análise:** O driver ainda está interpretando a URL incorretamente. O problema pode ser:
1. A URL está sendo passada de forma incorreta para o driver
2. O Spring Boot não está lendo a variável de ambiente corretamente
3. A configuração do application-prod.properties está incorreta

### Status Final:
- ✅ **Configuração simplificada** - Apenas uma URL no application-prod.properties
- ✅ **Secrets limpos** - Removidos JDBC_DATABASE_USERNAME e JDBC_DATABASE_PASSWORD
- ✅ **Deploy realizado** - Aplicação atualizada
- ❌ **Erro persiste** - Ainda `UnknownHostException` com URL malformada

### Erro Atual:
```
java.net.UnknownHostException: postgres:Senharealsupabase%40%40@db.vssxqnkfswdhpsczsmyq.supabase.co
```

### Análise:
O driver PostgreSQL ainda está interpretando a URL incorretamente, tratando `postgres:Senharealsupabase%40%40@` como hostname em vez de `usuario:senha@`.

### Possíveis Causas:
1. **Problema de encoding** - A senha codificada pode estar causando problemas
2. **Formato da URL** - Pode haver caracteres especiais não tratados
3. **Configuração do Spring Boot** - Pode estar lendo a variável de ambiente incorretamente

### Status Final:
- ✅ **Senha atualizada** - Nova senha `Numanabolada` sem caracteres especiais
- ✅ **Secret atualizado** - URL com nova senha
- ❌ **Erro persiste** - Ainda `UnknownHostException` com URL malformada

### Erro Atual:
```
java.net.UnknownHostException: postgres:Numanabolada@db.vssxqnkfswdhpsczsmyq.supabase.co
```

### Análise Final:
O driver PostgreSQL ainda está interpretando a URL incorretamente, tratando `postgres:Numanabolada@` como hostname em vez de `usuario:senha@`. Isso indica que o problema não é a senha, mas sim como o Spring Boot está lendo a variável de ambiente.

### Possíveis Causas:
1. **Variável de ambiente não está sendo passada** - O Spring Boot pode não estar recebendo `JDBC_DATABASE_URL`
2. **Configuração incorreta** - O `application-prod.properties` pode não estar sendo lido corretamente
3. **Problema de deploy** - A aplicação pode estar usando uma versão antiga do código

### Status Final - SUCESSO! 🎉
- ✅ **Mapeamento explícito** - Adicionado `[env]` no fly.toml
- ✅ **Secrets verificados** - SPRING_PROFILES_ACTIVE e JDBC_DATABASE_URL configurados
- ✅ **Deploy realizado** - Aplicação atualizada com mapeamento
- ✅ **Aplicação funcionando** - Spring Boot iniciou com sucesso!

### Logs de Sucesso:
```
2025-09-27 15:45:47 - Starting ControlTowerApplication v1.0.0 using Java 17.0.16
2025-09-27 15:45:47 - The following 1 profile is active: "prod"
2025-09-27 15:45:54 - Root WebApplicationContext: initialization completed in 6567 ms
```

### Aplicação Disponível:
https://backend-falling-forest-8240.fly.dev/

### Resumo da Solução:
O problema era que o Spring Boot não estava recebendo a variável de ambiente `JDBC_DATABASE_URL` do secret do Fly.io. A solução foi mapear explicitamente a variável no arquivo `fly.toml` usando a seção `[env]`.

## Git Commit - Reorganização do Projeto ✅

### Commit Realizado:
- **Hash**: `3c3f07b`
- **Branch**: `refactor/api-identifier-to-id`
- **Arquivos**: 24 files changed, 222 insertions(+), 97 deletions(-)

### Mudanças Commitadas:
- ✅ **Reorganização estrutural** - Todos os arquivos backend movidos para `backend/` directory
- ✅ **Dockerfile adicionado** - Configuração para deployment containerizado
- ✅ **Configurações corrigidas** - Application properties com profiles dev/prod
- ✅ **Documentação atualizada** - Scratchpad com todo o processo de deployment
- ✅ **Limpeza realizada** - Removidos arquivos desnecessários (.DS_Store, .vscode/)

### Status do Repositório:
- ✅ **Commit realizado** - Todas as mudanças salvas no git
- ✅ **Estrutura organizada** - Projeto com separação clara frontend/backend
- ✅ **Deploy funcional** - Aplicação rodando em produção no Fly.io
