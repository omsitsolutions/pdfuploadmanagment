const config = {
  development: {
    username: 'postgres',
    password: 'filho3766',
    database: 'documents',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps : true,
      underscored: true,
      unserscoredAll: true
    } 
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps : true,
      underscored: true,
      unserscoredAll: true
    } 
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps : true,
      underscored: true,
      unserscoredAll: true
    } 
  }
}

const env = process.env.NODE_ENV || 'development'

module.exports = config[env]
