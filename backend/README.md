# Documentação Product Management back-end

Esta documentação descreve informações essenciais sobre a API Node.js do projeto.

## Estrutura de diretórios

```
├── src/
│ ├── core/               # Possui arquivos que serão usados em toda API.
│ │ └── types/            # Diretório com tipagens usadas na estrutura do projeto.
│ ├── infra/              # Controladores da API.
│ │ ├── express/          # Diretório responsável por todas as configurações do Express.
│ │ ├── prisma/           # Diretório com as conexões com banco de dados.
│ │ └── server.ts/        # Arquivo responsável por levantar uma instância da API.
│ ├── modules/            # Diretório contendo todos os módulos de serviços.
│ │ └── module/           # Diretório exemplificando um mudulo(accounts, movies).
│ │   ├── domains/        # Diretório contendo as tipagens dos domínios que serão usados no modulo.
│ │   ├── entities/       # Diretório contendo as classes que representam as entidades do banco de dados.
│ │   ├── infra/          # Diretório contendo a camada de infraestrutura de cada módulo (express, prisma).
│ │   ├── useCases/       # Diretório contendo os casos de uso e controllers do módulo.
│ │   └── validations/    # Diretório contendo as schemes de validação dos casos de usos.
│ └── shared/             # Configuração do banco de dados
│     ├── container/      # Diretório contendo todas as injeções de dependências usadas na API.
│     ├── erros/          # Diretório contendo arquivos com as classes de erros.
│     └── utils/          # Funções utilitárias.
├── .docker/              # Diretório com volumes para docker
├── prisma/               # Diretório que centraliza todas as migrations e conexões com banco de dados usando Prisma ORM
├── .env.example          # Exemplo de arquivo .env
├── docker-compose.yml    # Arquivo de configuração do Docker Compose
├── start-environment.sh  # Script para automatizar a execução da api em ambientes linux
└── package.json          # Dependências e scripts
```

## Tecnologias utilizadas

- [Node.js](https://nodejs.org) - Ambiente de execução JavaScript do lado do servidor.
- [Docker](https://www.docker.com) - Plataforma para criar e executar aplicativos em contêineres.
- [Docker Compose](https://docs.docker.com/compose) - Ferramenta para definir e executar aplicativos Docker multi-container.
- [Express](https://expressjs.com) - Framework web rápido, flexível e minimalista para Node.js.
- [@prisma/client](https://www.prisma.io/client) - Cliente de banco de dados ORM para Node.js.
- [tsyringe](https://github.com/microsoft/tsyringe) - Contêiner de injeção de dependência leve para TypeScript.
- [Zod](https://github.com/colinhacks/zod) - Biblioteca para validação de esquemas.

## Pré-Requisitos

Certifique-se de ter as seguintes dependências instaladas em sua máquina:

- Docker Compose (Utilizado para criar o ambiente de desenvolvimento)
- Docker (Para ser utilizado no ambiente de produção)
- Node.js (versão v18 ou superior)
- Yarn (versão v1.22.19 ou superior)

## Configuração

1. Certifique-se de ter o Node.js, Docker e Docker Compose instalado em sua máquina.
2. Clone este repositório em seu ambiente local:
3. Navegue até o diretório do projeto
4. Instale as dependências para desenvolvimento: `yarn`
5. Renomeie o arquivo `.env.example` para `.env` e atualize as variáveis de ambiente.

## Executando o projeto em ambiente de desenvolvimento

1. Na raiz do diretório execute o comando `docker compose up --build` para criar todo o ambiente de desenvolvimento (Banco de dados).
2. Após a subida do banco de dados deve ser executado o comando `db:migrate` para criação das tabelas do banco de dados.
3. Execute o comando `dev:server` para subir a api em modo de desenvolvimento ou execute o comando `yarn build & yarn start:server` para executar a api no modo de produção.
4. Acesse a porta que foi definida na variável de ambiente `PORT`.

## Considerações adicionais

Caso tenha dificuldades em subir a api para testes é só executar o script `start-environment.sh` que criei para automatizar a inicialização da api lembrando que esse script é para ambientes linux.
