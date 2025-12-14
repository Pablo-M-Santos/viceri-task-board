# 🗂️ Viceri Task Board — Desafio Frontend React

Aplicação web desenvolvida em React.js como solução para o Desafio Frontend da Viceri, com o objetivo de melhorar o processo de criação, organização e acompanhamento de tarefas em squads ágeis.

A aplicação simula um quadro Kanban, permitindo o gerenciamento visual de tarefas por status, inspirado em ferramentas como o Notion.

## 📌 Contexto do Desafio

Na Viceri, os times trabalham em squads utilizando metodologias ágeis. Para garantir organização e visibilidade do trabalho, as tarefas precisam ser bem definidas e acompanhadas conforme seu status.

Este projeto foi desenvolvido para permitir que desenvolvedores:

- Cadastrem suas tarefas

- Organizem por status

- Acompanhem a evolução do trabalho de forma visual e intuitiva

## ✅ Visão Geral da Solução

- A solução consiste em uma aplicação frontend que oferece:

- Quadro Kanban com colunas de status

- Gerenciamento completo de tarefas (CRUD)

- Persistência local dos dados

- Interface moderna, responsiva e intuitiva

## 🔄 Fluxo da Aplicação

- O usuário acessa a aplicação e visualiza o board com os status disponíveis;

- Uma nova tarefa pode ser criada informando:

- Título da tarefa

- Status inicial;

- As tarefas são exibidas em cards dentro da coluna correspondente;

- O usuário pode:

- Visualizar detalhes da tarefa;

- Editar informações;

- Excluir tarefas;

- As informações são salvas no Local Storage, garantindo persistência mesmo após recarregar a página.

## 📋 Requisitos Funcionais (RF) e Regras de Negócio (RN)
RF001 — Cadastrar Tarefa

- Permite cadastrar uma nova tarefa informando título e status.

RF002 — Editar Tarefa

- Permite alterar o título e o status da tarefa.

RF003 — Excluir Tarefa

- Permite excluir uma tarefa mediante confirmação.

RF004 — Listagem de Tarefas

- Todas as tarefas são exibidas no board, organizadas por status.

RF005 — Filtragem de Tarefas

- Permite filtrar tarefas por texto nome.


## 🛠️ Tecnologias Utilizadas

- React.js

- TypeScript

- Vite

- Phosphor Icons

- Local Storage

## 📂 Estrutura do Projeto
```
src
├── assets
│   └── imagemFundo.png
├── components
│   ├── Header
│   │   ├── Header.tsx
│   │   └── Header.css
│   ├── Board
│   │   ├── Board.tsx
│   │   └── Board.css
│   └── Card
│       ├── TaskCard.tsx
│       └── TaskCard.css
├── App.tsx
└── main.tsx
```

## 🚀 Como Executar o Projeto

Certifique-se de ter instalado:

- Node.js (versão LTS recomendada)

- npm ou yarn

## ▶️ Passo a passo

Clone o repositório:
```
git clone https://github.com/seu-usuario/viceri-task-board.git
```


Acesse a pasta do projeto:

```
cd viceri-task-board
```

Instale as dependências:

```
npm install
# ou
yarn install
```


Inicie o servidor de desenvolvimento:

```
npm run dev
# ou
yarn dev
```


A aplicação estará disponível em:

```
http://localhost:5173
```

## 💾 Armazenamento de Dados

As tarefas são armazenadas no Local Storage do navegador;

Não há necessidade de backend ou banco de dados;

Os dados persistem mesmo após atualizar a página.

 ## 🎨 Decisões de Arquitetura e Design

- Componentização para facilitar manutenção e escalabilidade;

- Separação de responsabilidades (Header, Board, Card);

- CSS Modules para evitar conflitos de estilos;

- Interface inspirada em Kanban, priorizando usabilidade;

- Estados controlados no React, sem dependência externa de gerenciamento de estado.

- Essas decisões foram tomadas visando clareza de código, organização e boa experiência do usuário.


## 📎 Considerações Finais

Este projeto foi desenvolvido com foco em:

- Boas práticas de frontend;

- Código limpo e organizado;

- Interface intuitiva e moderna;

- Facilidade de uso para times ágeis.

Fico à disposição para esclarecer qualquer dúvida sobre a implementação ou decisões técnicas.
