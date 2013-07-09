exports.routes = (map) ->
    map.get '/doctypes/', 'doctypes#all'
    map.get '/doctypes/:doctype', 'doctypes#show'
