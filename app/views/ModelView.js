const ModelView = Backbone.Marionette.View.extend({
  tagName: 'tr',
  className: 'table-row',
  initialize: function (options) {
    this.template = options.template
  },
  attributes: function () {
    return {
      'data-id': this.model.get('id'),
      'data-toggle': 'modal',
      'data-target': '#modelModal'
    }
  }
})

export default ModelView
