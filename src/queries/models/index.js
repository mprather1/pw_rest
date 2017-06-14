var queries = {}

export default function getAllRoutes (options) {
  var db = options.db
  var logger = options.logger

  queries.getAllModels = (req, res, next) => {
    db.query('SELECT * FROM models', (err, results, fields) => {
      if (err) logger.error(err)

      res.status(200)
      .json({
        status: 'success',
        body: results
      })
    })
  }

  queries.createModel = (req, res, next) => {
    var post = {name: req.body.name, attribute: req.body.attribute}

    db.query('INSERT INTO models SET ?', post, function (err, results, fields) {
      if (err) logger.error(err)

      res.status(200)
      .json({
        status: 'success',
        message: 'Inserted ' + results.affectedRows + ' rows'
      })
    })
  }

  queries.getSingleModel = (req, res, next) => {
    var modelId = parseInt(req.params.id)

    db.query('SELECT * FROM models WHERE id = ?', db.escape(modelId), function (err, results, fields) {
      if (err) logger.error(err)

      res.status(200)
      .json({
        status: 'success',
        body: results
      })
    })
  }

  queries.updateSingleModel = (req, res, next) => {
    var modelId = parseInt(req.params.id)

    db.query('UPDATE models SET name=?, attribute=? WHERE id = ?', [req.body.name, req.body.attribute, db.escape(modelId)], function (err, results, fields) {
      if (err) logger.error(err)

      res.status(200)
      .json({
        status: 'success',
        message: 'updated ' + results.affectedRows + ' rows'
      })
    })
  }

  queries.removeModel = (req, res, next) => {
    var modelId = parseInt(req.params.id)

    db.query('DELETE FROM models WHERE id = ?', db.escape(modelId), function (err, results, fields) {
      if (err) logger.error(err)

      res.status(200)
      .json({
        status: 'success',
        results: 'deleted ' + results.affectedRows + ' rows'
      })
    })
  }

  return queries
}
