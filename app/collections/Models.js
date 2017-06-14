import Model from '../models/Model'

const Models = Backbone.Collection.extend({
  model: Model,
  initialize: function (model, options) {
    this.url = 'http://' + (window.location.hostname) + ':8000/api/models'
  },

  parse: function (response) {
    return response.body
  }
})

export default Models
