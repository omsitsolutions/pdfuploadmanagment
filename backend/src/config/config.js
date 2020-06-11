require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
    define: {
      timestamps : true,
      underscored: true,
      unserscoredAll: true
    } 
  },
  test: {
    dialect: process.env.DB_DIALECT || "sqlite",
    storage: './__tests__database.sqlite',
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
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
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
