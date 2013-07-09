class exports.DocType extends Backbone.Model

    # Copy task properties to current model.
    constructor: (type) ->
        super

        @[property] = type[property] for property of type

    url: ->
        "doctype/#{@id}"
