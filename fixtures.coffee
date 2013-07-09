###
Script to add data fixtures to the data system
to setup the dev env.
####
async = require 'async' # npm install async
Client = require('request-json').JsonClient # npm install request-json

# Connection to the data system
client = new Client "http://localhost:9101/"
requests = []


# Data are wrapped inside async requests. Current state: dirty.
# TODO: refactoring to separate properly the data from the code

# Agenda meta doctype document
requests.push (callback) ->
    doc =
        docType: "metaDoctype"
        related: "Alarm" # what doctype this document describes
        displayName: "Alarme"
        identificationField: "description"
        fields: [
            "action":
                displayName: "Action"
                description: "Représente le canal de diffusion de l'alarme dans le format iCal (DISPLAY, EMAIL, AUDIO)"
            "trigg":
                displayName: "Date de déclenchement"
                description: "Date à laquelle l'alarme doit être déclenchée"
            "related":
                displayName: "En relation"
                description: "Si cette alarme a été créée en relation avec un autre document, ce champ permet de spécifier l'identifiant de ce document."
        ]
    client.post 'data/', doc, (err, res, body) ->
        if err?
            callback("#{res.statusCode} - #{err}", null)
        else
           callback(null, 'OK')

# Agenda documents
requests.push (callback) ->
    doc =
        docType: "Alarm"
        action: "DISPLAY"
        trigg: "Tue Jul 08 2013 14:30:00"
        description: "Réunion scopyleft"
        related: null
    client.post 'data/', doc, (err, res, body) ->
        if err?
            callback("#{res.statusCode} - #{err}", null)
        else
           callback(null, 'OK')
requests.push (callback) ->
    doc =
        docType: "Alarm"
        action: "DISPLAY"
        trigg: "Tue Jul 19 2013 09:00:00"
        description: "Réunion MesInfos"
        related: null
    client.post 'data/', doc, (err, res, body) ->
        if err?
            callback("#{res.statusCode} - #{err}", null)
        else
           callback(null, 'OK')
requests.push (callback) ->
    doc =
        docType: "Alarm"
        action: "DISPLAY"
        trigg: "Tue Jul 02 2013 16:00:00"
        description: "Réunion review scopyleft"
        related: null
    client.post 'data/', doc, (err, res, body) ->
        if err?
            callback("#{res.statusCode} - #{err}", null)
        else
           callback(null, 'OK')

# Contact meta doctype document
requests.push (callback) ->
    doc =
        docType: "metaDoctype"
        related: "Contact" # what doctype this document describes
        displayName: "Contact"
        identificationField: "fn"
        fields: [
            "fn":
                displayName: "Nom complet"
                description: "Le nom complet du contact."
            "datapoints":
                displayName: "Données complémentaires"
                description: "Tabeau contenant des données complémentaires sur le contact."
            "note":
                displayName: "Note"
                description: "Une note sur le contact."
        ]
    client.post 'data/', doc, (err, res, body) ->
        if err?
            callback("#{res.statusCode} - #{err}", null)
        else
           callback(null, 'OK')

# Contact documents
requests.push (callback) ->
    doc =
        docType: "Contact"
        fn: "Joseph Silvestre"
        datapoints: [
            {
                name: "about"
                type: "birthday"
                value: "02/02/1990"
                id: 1
            },
            {
                name: "tel"
                type: "main"
                value: "+33 12 34 56 78"
                id: 2
            }
        ]
        note: "Données complémentaires sur le contact."
    client.post 'data/', doc, (err, res, body) ->
        if err?
            callback("#{res.statusCode} - #{err}", null)
        else
           callback(null, 'OK')

requests.push (callback) ->
    doc =
        docType: "Contact"
        fn: "David Larlet"
        datapoints: [
            {
                name: "about"
                type: "birthday"
                value: "02/02/1980"
                id: 1
            },
            {
                name: "tel"
                type: "main"
                value: "+33 12 34 56 78"
                id: 2
            }
        ]
        note: "Données complémentaires sur le contact."
    client.post 'data/', doc, (err, res, body) ->
        if err?
            callback("#{res.statusCode} - #{err}", null)
        else
           callback(null, 'OK')


# Task meta doctype document
requests.push (callback) ->
    doc =
        docType: "metaDoctype"
        related: "Task" # what doctype this document describes
        displayName: "Tâche"
        identificationField: "description"
        fields: [
            "description":
                displayName: "Description"
                description: "Le contenu de la tâche."
            "done":
                displayName: "Fait?"
                description: "Indique si la tâche a été réalisée ou pas."
            "creationDate":
                displayName: "Date de création"
                description: "Date à laquelle la tâche a été créée."
            "completionDate":
                displayName: "Date de complétion"
                description: "Date à laquelle la tâche a été marquée comme faite."
            "previousTask":
                displayName: "Tâche précédente"
                description: "Une référence à la tâche précédente dans la liste."
            "nextTask":
                displayName: "Tâche suivante"
                description: "Une référence à la tâche suivante dans la liste."
            "list":
                displayName: "Liste"
                description: "Une référence à la liste à laquelle appartient la tâche."
            "tags":
                displayName: "Tags"
                description: "Les tags liés à la tâche."
        ]
    client.post 'data/', doc, (err, res, body) ->
        if err?
            callback("#{res.statusCode} - #{err}", null)
        else
           callback(null, 'OK')

# Task documents
requests.push (callback) ->
    doc =
        docType: "Task"
        id: "29aba0e2c27d5406dcc05bc919001d4d"
        description: "Ma super todo à faire"
        done: false
        completionDate: null
        creationDate: "1373360685861"
        previousTask: "29aba0e2c27d5406dcc05bc919001b1b"
        nextTask: null
        list: "29aba0e2c27d5406dcc05bc919001b1b"
        tags: []
    client.post 'data/', doc, (err, res, body) ->
        if err?
            callback("#{res.statusCode} - #{err}", null)
        else
           callback(null, 'OK')

requests.push (callback) ->
    doc =
        docType: "Task"
        id: "29aba0e2c27d5406dcc05bc919002138"
        description: "Une autre #super tâche"
        done: false
        completionDate: null
        creationDate: "1373360689162"
        previousTask: "29aba0e2c27d5406dcc05bc9190027c2"
        nextTask: "29aba0e2c27d5406dcc05bc919001d4d"
        list: "29aba0e2c27d5406dcc05bc919001b1b"
        tags: ["super"]
    client.post 'data/', doc, (err, res, body) ->
        if err?
            callback("#{res.statusCode} - #{err}", null)
        else
           callback(null, 'OK')

requests.push (callback) ->
    doc =
        docType: "Task"
        id: "29aba0e2c27d5406dcc05bc9190027c2"
        description: "Encore une #super tâche"
        done: false
        completionDate: null
        creationDate: "1373360693530"
        previousTask: null
        nextTask: "29aba0e2c27d5406dcc05bc919002138"
        list: "29aba0e2c27d5406dcc05bc919001b1b"
        tags: ["super"]
    client.post 'data/', doc, (err, res, body) ->
        if err?
            callback("#{res.statusCode} - #{err}", null)
        else
           callback(null, 'OK')


# We remove the old data
setupRequests = []
setupRequests.push (callback) ->
    client.put 'request/alarm/all/destroy/', {}, (err, res, body) ->
        callback(err, body)
setupRequests.push (callback) ->
    client.put 'request/contact/all/destroy/', {}, (err, res, body) ->
        callback(err, body)
setupRequests.push (callback) ->
    client.put 'request/task/all/destroy/', {}, (err, res, body) ->
        callback(err, body)

# We run the request with async (parallel execution, wait for all the callbacks)
console.log "Adding #{requests.length} new document to the data system..."
async.parallel setupRequests, (err, results) ->
    console.log err if err?
    async.parallel requests, (err, results) ->
       if err?
            console.log err if err?
        else
            console.log "#{results.length} documents have successfully added to the data system."