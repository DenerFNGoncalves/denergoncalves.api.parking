module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PWD || "postgres",
    database: process.env.DB_NAME || "parking_dev",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "5432",
    dialect: process.env.DB_DIALECT || "postgres",
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PWD || "postgres",
    database: process.env.DB_NAME || "parking_test",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "5432",
    dialect: process.env.DB_DIALECT || "postgres",
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
    dialectOptions: {
      bigNumberStrings: true
    }
  }
}