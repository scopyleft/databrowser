load 'application'

Client = require('request-json').JsonClient # npm install request-json
client = new Client "http://localhost:9101/"
requests = []


async = require 'async'

returnDoctypes = (err, doctypes) ->
    if err
        console.error err
        send error: "Retrieve doctypes failed.", 500
    else
        send number: doctypes.length, rows: doctypes


action 'all', ->
    doctypes = ["alarm", "album", "application", "attachment", "bookmark",
        "contact", "cozyinstance", "feed", "folder", "logmessage", "mail",
        "mailbox", "mailfolder", "mailtobe", "note", "notification", "param",
        "photo", "task", "todolist", "tree", "user"]
    returnDoctypes null, doctypes


action 'show', ->
    doctype = params.doctype
    client.post 'request/'+doctype+'/all/', {}, (error, request, response) ->
        returnDoctypes error, response
