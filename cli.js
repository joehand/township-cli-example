#! /usr/bin/env node

var subcommand = require('subcommand')
var Township = require('township-client')
var client = Township({
  server: 'https://api.town.ship' // set default server here
})

var match = subcommand({
  root: require('./commands/root'),
  none: require('./commands/help'),
  commands: [
    require('./commands/login')(client),
    require('./commands/logout')(client),
    require('./commands/register')(client),
    require('./commands/whoami')(client)
  ]
})

match(process.argv.slice(2))
