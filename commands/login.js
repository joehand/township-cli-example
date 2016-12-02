var prompt = require('prompt')
var error = require('../lib/error')

module.exports = function (client) {
  return {
    name: 'login',
    command: function login (args) {
      var opts = []

      if (!args.username) {
        opts.push({
          name: 'email',
          required: true
        })
      }

      opts.push({
        name: 'password',
        required: true,
        hidden: true,
        replace: '*'
      })

      prompt.message = ''
      prompt.colors = false
      prompt.start()

      prompt.get(opts, function (err, results) {
        if (err) return error(err.message)
        args.email = args.email || results.email
        args.password = args.password || results.password
        client.login(args, function (err) {
          if (err) return error(err.message)
          console.log('logged in!')
        })
      })
    },
    options: [
      {
        name: 'email',
        abbr: 'e',
        boolean: false,
        default: null,
        help: 'Your email address'
      },
      {
        name: 'password',
        abbr: 'p',
        boolean: false,
        default: null,
        help: 'Your password'
      }
    ]
  }
}
