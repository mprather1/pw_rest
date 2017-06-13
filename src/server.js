import express from 'express'
import bodyParser from 'body-parser'
import {Server} from 'http'
import helmet from 'helmet'
import winston from 'winston-color'
import chalk from 'chalk'
import getRouter from './routes'
import config from './_config'
import pkg from '../package.json'
import {init as db} from './queries'

const options = {
  app: express(),
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  logger: winston,
  config: config,
  packageName: pkg.name,
  packageVersion: pkg.version
}

options.db = db(options)

const { app, port, logger, packageVersion, packageName } = options

app.use(helmet())

const server = Server(app)
const router = getRouter(options)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

server.on('listening', () => {
  logger.info(`${chalk.bgBlack.cyan(packageName)} ver.${chalk.bgBlack.green(packageVersion)} istening on port ${chalk.bgBlack.yellow(port)}...`)
})

server.on('request', (req, res) => {
  logger.info(req.method, req.url)
})

server.on('error', (err) => {
  logger.error(err)
})

server.listen(port)

export default server
