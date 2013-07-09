views = require 'views/app_view'

module.exports = class Router extends Backbone.Router

    routes:
        '': 'home'
        'doctype/:doctypeId': 'doctype'
        'doctype/:doctypeId/documents/': 'documents'
        'doctype/:doctypeId/documents/:documentId': 'document'

    home: ->
        homeView = new views.HomeView()
        homeView.render()

    doctype: (doctypeId) ->
        doctypeView = new views.DoctypeView()
        doctypeView.populateData doctypeId
        doctypeView.render()

    # Routes below are not in use for now
    documents: (doctypeId) ->
        documentsCollection = new views.DocumentsCollection()
        documentsCollection.render()

    document: (doctypeId, documentId) ->
        documentView = new views.DocumentView()
        documentView.render()
