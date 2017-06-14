const config = {}

config.mysqlDB = {
  development: {
    host: 'localhost',
    user: 'mike',
    password: 'password',
    database: 'development'
  },
  test: {
    host: 'localhost',
    user: 'mike',
    password: 'password',
    database: 'test'
  },
  production: process.env['DATABASE_URL']
}

export default config
