<div align="center">
  <img src="public/img/login/Logo.svg" alt="Chronos Income" width="200" />

  <h1>Chronos Income</h1>

  <p>Plataforma para gerenciamento de horas trabalhadas, projetos e faturamento para produtores independentes.</p>

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![React Query](https://img.shields.io/badge/React_Query-5-red?style=flat-square&logo=reactquery)
![Styled Components](https://img.shields.io/badge/Styled_Components-6-pink?style=flat-square&logo=styled-components)

</div>

---

## 📋 Sobre o projeto

O **Chronos Income** é uma plataforma desenvolvida para simplificar a rotina do produtor independente. Com ela, é possível organizar projetos, registrar o tempo dedicado a cada tarefa, gerenciar clientes e gerar relatórios e invoices de forma prática e eficiente.

### ✨ Funcionalidades

- **📅 Calendário** — Planeje e registre suas atividades diárias com uma visão mensal clara e intuitiva
- **⏱️ Cronômetro** — Meça o tempo dedicado a cada tarefa com um timer integrado que registra horas com precisão, com suporte a pausar, retomar e finalizar
- **👥 Gerenciamento** — Centralize o controle de clientes e projetos em um único ambiente, com visualização detalhada e edição facilitada
- **📊 Relatórios** — Acompanhe sua produtividade com relatórios visuais por período, separados por valores pagos e pendentes
- **🧾 Invoice** — Gere e gerencie invoices por projeto e período, com controle de status (Pendente, Pago, Cancelado)

---

## 🛠️ Stack

| Tecnologia                                          | Uso                              |
| --------------------------------------------------- | -------------------------------- |
| [Next.js 15](https://nextjs.org/)                   | Framework principal (App Router) |
| [TypeScript](https://www.typescriptlang.org/)       | Tipagem estática                 |
| [React Query](https://tanstack.com/query)           | Gerenciamento de estado servidor |
| [Styled Components](https://styled-components.com/) | Estilização                      |
| [React Hook Form](https://react-hook-form.com/)     | Gerenciamento de formulários     |
| [Yup](https://github.com/jquense/yup)               | Validação de schemas             |
| [Recharts](https://recharts.org/)                   | Gráficos e visualizações         |

---

## 🚀 Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Yarn](https://yarnpkg.com/)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Joao-Faustinoo/chronos-income.git

# Entre na pasta
cd chronos-income

# Instale as dependências
yarn
```

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=https://sua-api.com/api
```

### Executando

```bash
# Desenvolvimento
yarn dev

# Build de produção
yarn build

# Iniciar produção
yarn start
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do projeto

```
chronos-income/
├── app/
│   ├── calendario/         # Calendário com timers
│   ├── clientes/           # Gerenciamento de clientes
│   ├── invoice/            # Invoices
│   └── relatorios/         # Relatórios
├── components/
│   ├── Cards/              # Componentes de card
│   ├── Charts/             # Gráficos
│   ├── Modals/             # Modais
│   ├── Skeletons/          # Loading skeletons
│   └── Header/             # Header e navegação
├── services/
│   ├── auth/               # Autenticação
│   ├── clients/            # Clientes
│   ├── invoices/           # Invoices
│   ├── projects/           # Projetos
│   └── reports/            # Relatórios
├── hooks/                  # Hooks customizados
├── utils/                  # Utilitários (datas, etc.)
└── public/                 # Arquivos estáticos
```

---

## 🔐 Autenticação

A autenticação é feita via JWT. O token é armazenado no `localStorage` e enviado automaticamente em todas as requisições autenticadas pelo helper `api()`.

| Rota                         | Descrição            |
| ---------------------------- | -------------------- |
| `POST /auth/login`           | Login                |
| `POST /auth/logout`          | Logout               |
| `POST /auth/forgot-password` | Recuperação de senha |
| `POST /auth/reset-password`  | Redefinição de senha |

---

<div align="center">
  Desenvolvido com ☕ e muito TypeScript
</div>
