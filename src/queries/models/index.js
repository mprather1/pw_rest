const queries = {}

export default function getAllRoutes (options) {
  const {db, logger} = options

  queries.getAllModels = (req, res, next) => {
    db.query('SELECT * FROM models', (err, results, fields) => {
      if (err) logger.error(err)

      res.status(200)
      .json(results)
    })
  }

  queries.createModel = (req, res, next) => {
    const post = {name: req.body.name, attribute: req.body.attribute}

    db.query('INSERT INTO models SET ?', post, function (err, results, fields) {
      if (err) logger.error(err)

      res.status(200)
      .json({
        status: 'success',
        message: 'Inserted one model...'
      })
    })
  }

  return queries
}
