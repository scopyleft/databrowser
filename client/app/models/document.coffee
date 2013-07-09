
# Storing a document for the given doctype
class exports.Document extends Backbone.Model

    # Copy task properties to current model.
    constructor: (doc) ->
        super

        @[property] = doc[property] for property of doc

    url: ->
        "databrowser/#doctype/#{@doctypeId}/documents/#{@id}"

    # because the server sends a list on model/:id
    parse: (data) ->
        return data.rows[0] if data.rows
