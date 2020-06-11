module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: postgres,
    operatorsAliases: false,
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
    dialect: postgres,
    operatorsAliases: false,
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
    dialect: postgres,
    operatorsAliases: false,
    logging: false,
    define: {
      timestamps : true,
      underscored: true,
      unserscoredAll: true
    } 
  }
}
