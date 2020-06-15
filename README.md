# Gerenciador de Documentos (Node.js e React)

O projeto é um simples (mas ótimo para estudos) gerenciador de documentos, na qual o usuário pode se cadastrar, se logar, realizar upload de documentos em PDF, ver detalhes e até mesmo visualizar os mesmos. O projeto tem seu Backend desenvolvido com Node.js (Express) e o Frontend foi desenvolvido com React.

O que você vai encontrar no Backend:
  - Node.js (Express)
  - Sequelize (Migrations, Seeders e Models)
  - Postgres (Banco de dados para ambiente de desenvolvimenti)
  - TDD com jest (testes unitários e testes de integração) utilizando SQLite
  - Autenticação JWT
  - Upload de arquivos com a lib Multer
  - Buffer de arquivos
  
O que você vai encontrar no Frontend:
  - React 
  - Redux (controle de estado)
  - Axios para consumir APIs
  - Routers (actions e reducers)

# Dependências

# Configuração e Execução
Após clonar e acessar a pasta do projeto, vamos instalar as dependências para que o nosso servidor Node.js possa funcionar.
Crie na raiz do projeto o arquivo `.env` utilizando as credenciais de seu banco Postgres:
```sh
APP_SECRET=ESCOLHA_UMA_CHAVE
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=
DB_PORT=
DB_DIALECT=postgres
```

Ainda na raiz do projeto vamos criar o arquivo `.env.test` que será responsável por carregar nossas configurações para que os testes possam ser executados. Como citado anteriormente, os testes serão realizados utilizando o banco de dados local SQLite.
```sh
APP_SECRET=ESCOLHA_UMA_CHAVE
DB_DIALECT=sqlite
```

Após configurar todas as variáveis de ambiente, vamos instalar nossas dependências, executando o comando na raiz do projeto:
```sh
$ yarn
```
Com as dependências instaladas, o nosso servidor já está pronto para ser executado, inclusive, já podemos roda os testes para serem validados:
```sh
$ yarn test
```

Após a validação dos testes, podemos executar nossas migrations para que as tabelas sejam geradas no nosso Banco de Dados Postgres.
```sh
$ yarn sequelize db:migrate
```

Nosso servidor está pronto, precisamos configurar o nosso client (React), para isso, vamos entrar na pasta client
```sh
$ cd client
```
Podemos executar o comando yarn para que as dependências possam ser instaladas
```sh
$ yarn
```
Ainda dentro da pasta client, crie o arquivo `.env` com a seguinte configuração
```sh
SKIP_PREFLIGHT_CHECK=true
```
Pronto, tudo configurado, já podemos utilizar nosso sistema em ambiente de desenvolvimento, um script já foi pré-configurado no arquivo `.package.json` para que possamos executar nosso servidor e nosso client ao mesmo tempo, basta executar o comando:
```sh
$ yarn dev
```

