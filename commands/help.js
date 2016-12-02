var usage = `
  USAGE:
    staticland {command} [options]

  COMMANDS:
    register,  create an account on a township server
    login,     log in to a township server
    logout,    log out of a township server
    whoami,    show which user you're using on which township server
    help,      show this help message

  HELP
    staticland help

  LOGIN
    staticland login --email hi@example.com --password sosecret --server api.static.land

  WHOAMI
    staticland whoami
`

module.exports = {
  name: 'help',
  command: function help (args, a, b, c) {
    console.log(usage)
  }
}
