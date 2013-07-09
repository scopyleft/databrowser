
# Storing a document for the given doctype
class exports.Document extends Backbone.Model

    # Copy task properties to current model.
    constructor: (doc) ->
        super

        @[property] = doc[property] for property of doc

    url: ->
        "databrowser/#doctype/#{@doctypeId}/documents/#{@id}"
