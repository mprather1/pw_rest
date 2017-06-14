const BackboneModalView = Backbone.Marionette.View.extend({
  tagName: 'div',

  className: 'modal fade hidden',

  id: 'backbone-modal',

  onRender: function () {
    this.$el.modal('show').removeClass('hidden')
  }

})

export default BackboneModalView
