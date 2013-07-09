# Description

Data browser allows you to browse your data stored on the Cozy platform.


# Install and run this app

## On a development environment

Clone this repository, install dependencies and run server (it requires Node.js
and Coffee-script)
    
    git clone git://github.com/scopyleft/databrowser.git
    cd databrowser
    npm install
    coffee server

Now open a browser at http://127.0.0.1:9250


## In your CozyCloud

Get to your CozyCloud apps page and in the "Install your app" window insert:

    https://github.com/scopyleft/databrowser

The app should get installed automatically.


# About Cozy

This app is suited to be deployed on the Cozy platform. Cozy is the personal
server for everyone. It allows you to install your every day web applications 
easily on your server, a single place you control. This means you can manage 
efficiently your data while protecting your privacy without technical skills.

More informations and hosting services on:
http://cozycloud.cc


# Definition of done

* publicly available at `https://github.com/scopyleft/databrowser`
* installable on a cozy server from `git://github.com/scopyleft/databrowser.git`
* languages: [coffeescript](http://coffeescript.org/), [jade](http://jade-lang.com/) and [stylus](http://learnboost.github.io/stylus/)
* ui: keep existing colors from cozy-todo app
* fonts: keep existing fonts from cozy-todo app
* target: Firefox 22, Chrome 27
