import validation from 'backbone-validation' // eslint-disable-line
import moment from 'moment'

const Model = Backbone.Model.extend({
  initialize: function (options) {
    this.urlRoot = 'http://' + (window.location.hostname) + ':8000/api/models'
  },

  validation: {
    name: [
      {
        required: true,
        msg: 'Name is required...'
      }
    ],
    attribute: [
      {
        pattern: 'number',
        msg: 'Attribute must be a number...'
      }
    ]
  },

  parse: function (response) {
    const createdAt = moment(response.created_at)

    const object = {
      id: response.id,
      name: response.name,
      attribute: response.attribute,
      created_at: createdAt.format('YYYY-MM-DD hh:mm:ss A')
    }

    return object
  }
})

export default Model
