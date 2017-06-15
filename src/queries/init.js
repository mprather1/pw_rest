import mysql from 'mysql'
import chalk from 'chalk'

export default function initDB (options) {
  const { environment, logger, config } = options

  const connection = config.mysqlDB[environment]

  const conn = mysql.createConnection(connection)

  conn.connect((err) => {
    if (err) {
      logger.error(err)

      throw err
    }

    if (environment !== 'test') {
      logger.info(`Connected to database ${chalk.bgBlack.green(conn.config.database)}...`)
    }
  })

  return conn
}
