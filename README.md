# Desafio Técnico Johnson&Johnson - Organizational Chart

> Tecnologias utilizadas

[![NestJS](https://img.shields.io/badge/Backend-NestJS-ea2845?logo=nestjs)](https://nestjs.com/)
[![React](https://img.shields.io/badge/Frontend-React-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47a248?logo=mongodb)](https://www.mongodb.com/)

---

## 🎯 Resumo

Aplicação web full stack que exibe hierarquias organizacionais de formas diversas (lista, tabela e árvore), permitindo que o usuário explore relacionamentos, filtre por critérios diversos, e visualize a estrutura da empresa.

---

## 🌐 Links para aplicação deployada

- **Frontend:** `https://your-frontend-deployment.vercel.app` *(to be replaced)*
- **Backend API:** `https://your-backend-deployment.herokuapp.com` *(to be replaced)*
- **Documentação da API:** `https://your-backend-deployment.herokuapp.com/api` *(Swagger UI - to be replaced)*

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   React + TypeScript + Vite (Frontend)               │   │
│  │   - Componentes Material UI                          │   │
│  │   - Axios HTTP Client                                │   │
│  └────────────────────┬─────────────────────────────────┘   │
└───────────────────────┼────────────────────────────-────────┘
                        │ HTTP/REST
                        │ (CORS enabled)
┌───────────────────────▼─────────────────────────────────────┐
│                         API                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   NestJS REST API (Backend)                          │   │
│  │   - Controllers (endpoints HTTP)                     │   │
│  │   - Services (regra de negócio)                      │   │
│  │   - DTOs (validação)                                 │   │
│  │   - Endpoint healthcheck                             │   │
│  └────────────────────┬─────────────────────────────────┘   │
└───────────────────────┼─────────────────────────────────────┘
                        │ Mongoose ODM
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                      PERSISTÊNCIA                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   MongoDB                                            │   │
│  │   - Collection People                                │   │
│  │   - Schema validation                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Arquitetura Backend (NestJS)

**Estrutura modular seguindo as melhores práticas do NestJS:**

- **Controllers**: Lidar com requests HTTP e respostas
  - `PeopleController`: CRUD para People
  - `HealthcheckController`: endpoint de healthcheck
  
- **Services**: Camada com regra de negócios
  - `PeopleService`: Operações para gerenciamento de pessoas
  
- **Schemas**: modelos de dados MongoDB utilizando Mongoose
  - `PeopleSchema`: Estrutura do documento People com validação
  
- **DTOs (Data Transfer Objects)**: Validação de objetos recebidos nas requests
  - `CreatePersonDto`: Valida objeto na request de criação de pessoa
  - `UpdatePersonDto`: Valida objeto na request de atualização de pessoa

- **Middleware & Pipes**:
  - Global validation pipe para validação automática dos DTOs
  - CORS enabled para requests cross-origin
  - Configuração de ambiente com `@nestjs/config`

### Arquitetura Frontend (React)

**Arquitetura baseada em componentes:**

- **Componentes**:
  - `Header`: Header com título da página e toggle de modo de visualização
  - `FiltersBar`: Interface de filtros com múltiplos critérios
  - `PeopleList`: Visualização de lista de cards
  - `PeopleTable`: Visualização em tabela
  - `PeopleTree`: Visualização de árvore hierárquica com MUI Tree View
  
- **Service**:
  - `api.ts`: Cliente HTTP centralizado com Axios
  
- **Utils**:
  - `buildTree.ts`: Função para construir a árvore hierárquica a partir dos dados recebidos
  
- **Types**:
  - interfaces Typescript para segurança em tipagem na aplicação

### Fluxo de dados

1. **User Interaction** → Componente dispara uma ação
2. **API Request** → Axios chama o endpoint do backend
3. **Controller** → Recebe requests, valida com DTOs (se aplicável)
4. **Service** → Executa regras de negócio
5. **Database** → Mongoose executa queries no MongoDB
6. **Response** → Data retorna através das camadas
7. **UI Update** → React re-renderiza com novo estado

---

## 🛠️ Tecnologias

### Backend

| Tecnologia | Justificativa |
|------------|---------------|
| **NestJS** | Framework Node.js com suporte a Typescript, injeção de dependência, e arquiteura modular. É ideal para APIs escaláveis e já possui suporte para testes, validação e documentação.  |
| **TypeScript** | Segurança na tipagem reduz erros e melhora a manutenção do código, sendo essencial para aplicações de grande porte e cenários com múltiplos desenvolvedores.  |
| **MongoDB + Mongoose** | NoSQL permite flexibilidade para evoluir schemas, e performance excelente para a estrutura de dados atual. O Mongoose facilita a conexão da aplicação com banco e validação de schema. |
| **class-validator & class-transformer** | Validação utilizando decorators, trasnformação automática de DTOs, conferindo integridade dos dados. |
| **Jest** | Framework de testes compreensivo com excelente suport para Typescript, mocks e relatório de cobertura de testes. |
| **ESLint + Prettier** | Reforçar qualidade e consistencia do código, reduzindo bugs e facilitando colaboração e padronização quando há multiplos desenvolvedores. |

### Frontend

| Technology | Justificativa |
|------------|---------------|
| **React 19** | Versão React mais recente com performance otimizada, muito utilizada na construção de aplicações frontend. |
| **TypeScript** | Tipagem certifica que teremos menos erros e uma experiência melhor de desenvolvimento. |
| **Material-UI (MUI)** | Biblioteca de componentes de fácil compreensão, temas customizáveis e componentes prontos. |
| **MUI Tree View** | Componente pronto para visualização de dados hierárquicos, evita "reinventar a roda" para árvores hierárquicas complexas. |
| **Axios** | Client HTTP robusto com interceptors, cancelamento de requests, e que lida melhor com erros em comparação ao fetch nativo. |

### DevOps & Tooling

| Technology | Justificativa |
|------------|---------------|
| **Variáveis de ambiente** | Gerenciamento de configurações seguro mantendo informações sensíveis fora do código. |
| **CORS** | Habilita requests cross-origin seguras entre frontend e backend durante desenvolviemento e produção. |

---

## ✨ Features

### Requisitos básicos

✅ **API HTTP com endpoint GET**
- GET `/api/people` - Busca todas as pessoas

✅ **Múltiplos modos de visualização**
- **List View**: Layout de cards com detalhes da pessoa
- **Table View**: Visualização em tabela 
- **Tree View**: Organização hierárquica

✅ **Filtros**
- Por departamento, manager, por tipo (Employee/Partner), por status (Active/Inactive)
- Busca por nome

✅ **Johnson & Johnson - instruções de marca**
- Cor primária: J&J Red (#EB1700)
- Cor secundária: White (#FFFFFF)
- Cinza neutro nos backgrounds
- Texto preto para legibilidade

### Requisitos opcionais

✅ **Backend** 
- Banco de dados persistente
- Validação de requisições (DTOs com validação automatica do class-validator)
- Health check
- Variáveis de ambiente
- Documentação Swagger - http://localhost:3000/api

✅ **Rotas extras**
- GET `/api/people/:id` - Busca pessoa por id
- POST `/api/people` - Cria nova pessoa
- PATCH `/api/people/:id` - Atualiza pessoa
- DELETE `/api/people/:id` - Apaga pessoa
- GET `/healthcheck` - Rota de healthcheck

---

## 🤖 IA durante o desenvolvimento 

**IA principal utilizada: GitHub Copilot**
- Usada no VSCode para sugestões de código para otimização de tempo e apoio com erros
- Suporte para refatoração e sugestões de melhorias
- Agentes utilizados: Claude Sonnet 4.5 e GPT-5

**Secundária: GPT**
- **Planejamento do projeto**: Discussão sobre requisitos, organização para implementação
- **Documentação**: Assistência para criação da documentação do README
- **Deploy**: Sugestão de ferramentas e auxilio no deploy da aplicação.

#### Limitações encontradas

- IA as vezes sugeria uso de métodos, componentes e estilização já depreciados 
- Necessário ter supervisão humana para lógicas de negócio e tomada de decisões
- Parte do código gerado acaba sendo muito complexo sem necessidade, precisando de refatoração

**Produtividade**: A IA reduziu tempo deprendido em tarefas repetitivas em cerca de 30-40%, permitindo manter mais foco em arquitetura, experiência do usuário e lógica de negócio. 

---

## 🚀 Para rodar o projeto

### Requisitos

- **Node.js**: v18.x ou mais recente ([Download](https://nodejs.org/))
- **MongoDB**: v6.x ou mais recente ([Download](https://www.mongodb.com/try/download/community))
  - OU use MongoDB Atlas (cloud, free tier disponível)
- **npm**: v9.x or mais recente (vem with Node.js)
- **Git**: Pra clonar o repositório

### Instalação

#### 1. Clone o repositório

```bash
git clone <https://github.com/liisaambrosen/teste-tecnico-johnson.git>
cd teste-tecnico-johnson
```

#### 2. Setup backend

```bash
cd backend
```

# Instalar dependências
npm install

# Crie arquivo .env
cp .env.example .env

# Edite o .env com sua string de conexão MongoDB
# MONGODB_URI=mongodb://localhost:27017/orgchart
# PORT=3000

# Importe os dados do arquivo org-chart-people-100.json para o seu MongoDB local ou crie usuários seguindo padrão Swagger para popular o banco. 

# Inicie o servidor
npm run start:dev

O backend irá rodar em `http://localhost:3000`

#### 3. Setup frontend

Em uma nova janela do terminal:

```bash
cd frontend/orgchart-frontend
```

# Instale dependências
npm install

# Crie arquivo .env com 
# VITE_API_URL=http://localhost:3000

# Inicie o servidor
npm run dev

The frontend will be running at `http://localhost:5173`

---

## 🧪 Testes

### Backend

```bash
cd backend

# Roda todos os testes unitários
npm run test

# Roda testes no watch mode
npm run test:watch

# Roda testes com relatório de cobertura
npm run test:cov
```

---

## 🎁 Features extras implementadas

## Melhorias Futuras
- Paginação via backend 
- Filtros no backend a depender da necessidade
- Docker/Conteinerização
- Testes e2e
- Autenticação 
- Cache com Redis
- Analytics
- Logs
