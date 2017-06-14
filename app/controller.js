import Marionette from 'marionette'
import Model from './models/Model'
import Models from './collections/Models'
import TableView from './views/TableView'
import FormView from './views/FormView'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options.app
  },

  index: function (page) {
    const app = this.app

    const models = new Models()

    this.models = models

    models.fetch({
      success: function (data) {
        app.view.showChildView('main', new TableView({
          collection: models,
          pageData: data.pageData,
          panelHeading: 'Models',
          template: require('./templates/table-view-template.html'),
          tableItemTemplate: require('./templates/model-view-template.html'),
          modalViewTemplate: require('./templates/modal-view-template.html')
        }))
      },

      error: function (err) {
        console.log(err)
      }
    })
  },

  formRoute: function () {
    const model = new Model({url: 'http://shintech.ninja:8000/api/models'})

    const formView = new FormView({
      formTemplate: require('./templates/form-view-template.html'),
      model: model
    })

    this.app.view.showChildView('main', formView)
  }
})

export default Controller
