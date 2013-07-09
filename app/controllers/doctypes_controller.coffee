load 'application'

Client = require('request-json').JsonClient # npm install request-json
client = new Client "http://localhost:9101/"
requests = []


async = require 'async'

returnDoctypes = (err, doctypes) ->
    if err
        console.log err
        send error: "Retrieve doctypes failed.", 500
    else
        send number: doctypes.length, rows: doctypes


action 'all', ->
    client.post 'request/task/all/', {}, (error, request, response) ->
        returnDoctypes error, response
