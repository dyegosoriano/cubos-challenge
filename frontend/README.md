# Documentação Product Management front-end

Esta documentação descreve informações essenciais sobre o frontend do projeto.

## Estrutura de diretórios

```
src - ROOT
├── assets
├── components
│   ├── Button - Exemplo da estrutura padrão de um componente
│   │   └── index.tsx - Arquivo com a estrutura HTML do componente Button
│   └── index.ts - Arquivo central para exportação de todos componentes
├── context
│   └── index.ts - Arquivo central para exportação de todos os contextos
├── hooks
│   └── index.ts - Arquivo central para exportação de todos os hooks
├── pages
│   └── Home.tsx - Exemplo da estrutura padrão de uma página
├── routes
│   ├── index.tsx - Arquivo responsável por retornar somente rotas públicas/privadas com base na autenticação do usuário
│   ├── routes.private.tsx - Rotas privadas
│   └── routes.public.tsx - Rotas públicas
├── styles
│   └── global.ts - Arquivo de estilização global
├── utils - Arquivo central para exportação de todos scripts da pasta utils
├── App.tsx
└── index.tsx
```

## Tecnologias utilizadas

- [Vite.js](https://vite.dev/) - Build tool rápido que oferece ambiente de desenvolvimento otimizado e empacotamento eficiente.
- [Tailwindcss](https://tailwindcss.com/) - Framework CSS utilitário para criação de interfaces responsivas e customizáveis.
- [axios](https://axios-http.com/) - Cliente HTTP baseado em Promises para consumo de APIs.
- [React Hook Form](https://www.react-hook-form.com/) - Biblioteca para gerenciamento de formulários em React com suporte a validação.
- [React Router](https://reactrouter.com/) - Biblioteca para roteamento dinâmico e navegação em aplicações React.
- [Zod](https://github.com/colinhacks/zod) - Biblioteca para validação de esquemas.

## Pré-Requisitos

Certifique-se de ter as seguintes dependências instaladas em sua máquina:

- Yarn (versão v1.22.22 ou superior)
- Node.js (versão v22 ou superior)

## Configuração

1. Navegue até o diretório do projeto
2. Instale as dependências para desenvolvimento: `yarn`
3. Renomeie o arquivo `.env.example` para `.env` e atualize as variáveis de ambiente.

## Executando o projeto em ambiente de desenvolvimento

1. Na raiz do diretório execute o comando `yarn dev` que logo em seguida inicializará o ambiente de desenvolvimento.
