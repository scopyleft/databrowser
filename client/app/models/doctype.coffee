
# Storing a document type from any cozy application
class exports.DocType extends Backbone.Model

    # Copy task properties to current model.
    constructor: (id) ->
        super
        @id = id

    url: ->
        "doctypes/#{@id}"

    # because the server sends a list on model/:id
    parse: (data) ->
        return data.rows[0] if data.rows
