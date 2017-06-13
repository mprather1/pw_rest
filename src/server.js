import express from 'express'
import bodyParser from 'body-parser'
import {Server} from 'http'
import helmet from 'helmet'
import winston from 'winston-color'
import chalk from 'chalk'
// import getRouter from './routes'
import config from './_config'
import pkg from '../package.json'

const options = {
  app: express(),
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  logger: winston,
  config: config,
  packageName: pkg.name,
  packageVersion: pkg.version
}

const { app, port, logger, packageVersion, packageName } = options

const server = Server(app)

app.use(helmet)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

server.on('listening', () => {
  logger.info(`${chalk.bgBlack.cyan(packageName)} ver.${chalk.bgBlack.green(packageVersion)} istening on port ${chalk.bgBlack.yellow(port)}...`)
})

server.on('error', (err) => {
  logger.error(err)
})

server.listen(port)
