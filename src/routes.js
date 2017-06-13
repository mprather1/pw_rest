import express from 'express'
import {models} from './queries'

export default function getRouter (options) {
  const router = express.Router()

// Models

  router.route('/models')
    .get(models(options).getAllModels)
    .post(models(options).createModel)

  return router
}
