module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'huntDB',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_ROOT_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: 'localhost',
    dialect: 'mysql',
  },
};
