import mysql from 'mysql'
import chalk from 'chalk'

export default function initDB (options) {
  var { environment, logger, config } = options

  var connection = config.mysqlDB[environment]

  var conn = mysql.createConnection(connection)

  conn.connect((err) => {
    if (err) throw err
    if (environment !== 'test') {
      logger.info(`Connected to database ${chalk.bgBlack.green(conn.config.database)}...`)
    }
  })

  return conn
}
