import express from 'express'
import bodyParser from 'body-parser'
import {Server} from 'http'
import helmet from 'helmet'
import winston from 'winston-color'
import chalk from 'chalk'
import getRouter from './routes'
import config from './_config'
import pkg from '../package.json'
import {init} from './queries'

var app = express()
var port = process.env.PORT || 8000
var environment = process.env.NODE_ENV || 'development'
var logger = winston
var packageName = pkg.name
var packageVersion = pkg.version

var options = {
  app: app,
  port: port,
  environment: environment,
  logger: logger,
  config: config,
  packageName: packageName,
  packageVersion: packageVersion
}

options.db = init(options)

app.use(helmet())

var server = Server(app)
var router = getRouter(options)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', router)

server.on('listening', () => {
  if (environment !== 'test') {
    logger.info(`${chalk.bgBlack.cyan(packageName)} ver.${chalk.bgBlack.green(packageVersion)} istening on port ${chalk.bgBlack.yellow(port)}...`)
  }
})

server.on('request', (req, res) => {
  if (environment !== 'test') {
    logger.info(req.method, req.url)
  }
})

server.on('error', (err) => {
  logger.error(err)
})

server.listen(port)

var serverConfig = {
  server: server,
  options: options
}

export default serverConfig
