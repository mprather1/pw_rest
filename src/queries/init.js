import mysql from 'mysql'
import chalk from 'chalk'

export default function initDB (options) {
  const { logger } = options

  var conn = mysql.createConnection({
    host: 'localhost',
    user: 'mike',
    password: 'password',
    database: 'development'
  })

  conn.connect((err) => {
    if (err) throw err
    logger.info(`Connected to database ${chalk.bgBlack.green(conn.config.database)}...`)
  })

  return conn
}
