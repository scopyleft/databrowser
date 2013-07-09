{Document} = require "../models/document"


class exports.DocumentCollection extends Backbone.Collection

    model: Document

    constructor: (@view, @doctypeId, @options) ->
        super(id: @doctypeId, @options)

        @url = "databrowser/#{@doctypeId}/tasks/"
        console.log @url
