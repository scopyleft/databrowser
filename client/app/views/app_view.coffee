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

    afterRender: ->
        @$dt = @dt = $("#doctypes")
        @dt.html null
        @doctypes = new DocTypeCollection()
        @doctypes.fetch
            success: (data) =>
                for list in data.models
                    @addDoctypeLine list.id

    addDoctypeLine: (doctype) ->
        @dt.append require('./templates/doctype')(doctype: doctype)


# Displaying a given doctype and associated documents
class exports.DoctypeView extends BaseView

    el: 'body.application'

    populateData: (doctype) ->
        console.log doctype


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

