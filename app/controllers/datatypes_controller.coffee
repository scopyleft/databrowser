load 'application'

Client = require('request-json').JsonClient # npm install request-json
client = new Client "http://localhost:9101/"
requests = []


async = require 'async'

returnDatatypes = (err, datatypes) ->
    if err
        console.log err
        send error: "Retrieve datatypes failed.", 500
    else
        send number: datatypes.length, rows: datatypes


action 'all', ->
    client.post 'request/task/all/', {}, (error, request, response) ->
        returnDatatypes error, response
