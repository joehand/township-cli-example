var error = require('../lib/error')

module.exports = function (client) {
  return {
    name: 'whoami',
    command: function whoami (args) {
      var login = client.config.get('currentLogin')
      if (!login) return error('Not currently logged in.')
      console.log('Email:', login.email)
      console.log('Server:', login.server)
    }
  }
}
