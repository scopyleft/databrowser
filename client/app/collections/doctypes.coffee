{DocType} = require "../models/doctype"

# Representing a collection of documents for the given doctype
class exports.DocTypeCollection extends Backbone.Collection

    model: DocType

    constructor: (@view, @options) ->
        super(@options)

        @url = "doctypes/"
        console.log @url

    parse: (response) ->
        response.rows
        console.log response.rows
