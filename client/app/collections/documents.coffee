{Document} = require "../models/document"

# Representing a collection of documents for the given doctype
class exports.DocumentCollection extends Backbone.Collection

    model: Document

    constructor: (@view, @doctypeId, @options) ->
        super(id: @doctypeId, @options)

        @url = "databrowser/#doctype/#{@doctypeId}/documents/"
        console.log @url

    parse: (response) ->
        response.rows
