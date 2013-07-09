BaseView = require '../lib/base_view'
ViewCollection = require '../lib/view_collection'
{DocType} = require "../models/doctype"
{DocumentCollection} = require "../collections/documents"
{Document} = require "../models/document"

class exports.HomeView extends BaseView

    el: 'body.application'
    template: require('./templates/home')

    afterRender: ->
        console.log "write more code here !"


class exports.DoctypeView extends BaseView

    el: 'body.application'
    template: require('./templates/doctype')

    afterRender: ->
        console.log "write more code here !"

    populateData: (id) ->
        console.log id


class exports.DocumentsCollection extends ViewCollection

    el: 'body.application'
    template: require('./templates/documents')

    afterRender: ->
        console.log "write more code here !"


class exports.DocumentView extends BaseView

    el: 'body.application'
    template: require('./templates/document')

    afterRender: ->
        console.log "write more code here !"

