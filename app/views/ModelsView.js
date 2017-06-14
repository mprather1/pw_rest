import ModelView from './ModelView'

const ModelsView = Backbone.Marionette.CollectionView.extend({
  tagName: 'tbody',
  childView: ModelView,
  initialize: function (options) {
    this.template = options.template
  },
  childViewOptions: function () {
    const template = this.template

    return {
      template: template
    }
  }

})

export default ModelsView
