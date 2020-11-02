Document Manager (Node.js and React)

The project is a simple document manager, in which the user can register, login, upload PDF documents, view details and even view them. The project has its Backend developed with Node.js (Express) and the Frontend was developed with React.

What you will find in the Backend:

    Node.js (Express)
    Sequelize (Migrations, Seeders and Models)
    Postgres (Database for development environment)
    TDD with jest (unit tests and integration tests) using SQLite
    JWT authentication
    Upload files with lib Multer
    File Buffer

What you will find in Frontend:

    React
    Redux (state control)
    Axios to consume APIs
    Routers (actions and reducers)

Dependencies

    Postgres Bank running locally
    Node.js v12 +
    yarn

Configuration and Execution

After cloning and accessing the project folder, we will install the dependencies so that our Node.js server can work. Create the .env file at the root of the project using your Postgres bank credentials:

APP_SECRET = CHOICE_UMA_CHAVE
DB_USER =
DB_PASSWORD =
DB_DATABASE =
DB_HOST =
DB_PORT =
DB_DIALECT = postgres

Still at the root of the project, we will create the .env.test file that will be responsible for loading our settings so that the tests can be run. As previously mentioned, the tests will be performed using the local SQLite database.

APP_SECRET = CHOICE_UMA_CHAVE
DB_DIALECT = sqlite

After configuring all the environment variables, we will install our dependencies, executing the command at the root of the project:

$ yarn

With the dependencies installed, our server is now ready to run, including, we can run the tests to be validated:

$ yarn test

After validating the tests, we can perform our migrations so that the tables are generated in our Postgres Database.

$ yarn sequelize db: migrate

Our server is ready, we need to configure our client (React), for that, we will enter the client folder

$ cd client

We can run the yarn command so that dependencies can be installed

$ yarn

Still inside the client folder, create the .env file with the following configuration

SKIP_PREFLIGHT_CHECK = true

Okay, everything is configured, we can now use our system in a development environment, a script has already been pre-configured in the .package.json file so that we can run our server and our client at the same time, just go back to the root of the project and execute the yarn dev command

$ cd ..
$ yarn dev

