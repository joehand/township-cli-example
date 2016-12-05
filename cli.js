#! /usr/bin/env node

var subcommand = require('subcommand')
var Township = require('township-client')
var client = Township({
  server: 'http://127.0.0.1:9966' // run server.js
})

var match = subcommand({
  root: require('./commands/help'),
  none: require('./commands/help'),
  commands: [
    require('./commands/login')(client),
    require('./commands/register')(client),
    require('./commands/whoami')(client)
  ]
})

match(process.argv.slice(2))
