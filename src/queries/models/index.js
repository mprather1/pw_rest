const queries = {}

export default function getAllRoutes (options) {
  queries.getAllModels = (req, res, next) => {
    res.status(200)
    .json({
      'status': 'success'
    })
  }

  return queries
}
