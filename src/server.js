import express from 'express'
import bodyParser from 'body-parser'
import {Server} from 'http'
import helmet from 'helmet'
import winston from 'winston'
import chalk from 'chalk'
import getRouter from './routes'
import config from './_config'
import pkg from '../package.json'
import {init as db} from './queries'

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'info' }),
    new (winston.transports.File)({
      filename: 'pw_rest.log',
      level: 'error'
    })
  ]
})

const options = {
  app: express(),
  port: process.env['PORT'] || 8000,
  environment: process.env['NODE_ENV'] || 'development',
  logger: logger,
  config: config,
  packageName: pkg.name,
  packageVersion: pkg.version
}

options.db = db(options)

const { app, port, environment, packageName, packageVersion } = options

app.use(helmet())

const server = Server(app)
const router = getRouter(options)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', router)

app.use(errorHandler)

server.on('listening', () => {
  if (environment !== 'test') {
    logger.info(`${chalk.bgBlack.cyan(packageName)} ver.${chalk.bgBlack.green(packageVersion)} istening on port ${chalk.bgBlack.yellow(port)}...`)
  }
})

server.on('request', (req, res) => {
  if (environment !== 'test') {
    logger.info(packageName, '-', req.method, req.url)
  }
})

server.on('error', (err) => {
  logger.error(err.stack)
})

server.listen(port)

const serverConfig = {
  server: server,
  options: options
}

function errorHandler (err, req, res, next) {
  logger.error(err.stack)

  if (res.headersSent) {
    return next(err)
  }

  res.status(500)
  res.send(err)
}

export default serverConfig
