BaseView = require '../lib/base_view'
ViewCollection = require '../lib/view_collection'
{DocTypeCollection} = require "../collections/doctypes"
{DocType} = require "../models/doctype"
{DocumentCollection} = require "../collections/documents"
{Document} = require "../models/document"


# Displaying the list of doctypes and related informations
class exports.HomeView extends BaseView

    el: 'body.application'
    template: require('./templates/home')

    constructor: ->
        @doctypes = new DocTypeCollection()
        super()

    afterRender: ->
        console.log "write more code here !"


# Displaying a given doctype and associated documents
class exports.DoctypeView extends BaseView

    el: 'body.application'
    template: require('./templates/doctype')

    afterRender: ->
        console.log "write more code here !"

    populateData: (id) ->
        console.log id


# Displaying a collection of documents once filtered
class exports.DocumentsCollection extends ViewCollection

    el: 'body.application'
    template: require('./templates/documents')

    afterRender: ->
        console.log "write more code here !"


# Displaying a given document and his metadata
class exports.DocumentView extends BaseView

    el: 'body.application'
    template: require('./templates/document')

    afterRender: ->
        console.log "write more code here !"

