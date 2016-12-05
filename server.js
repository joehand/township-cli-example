var http = require('http')
var memdb = require('memdb')
var appa = require('appa')
var township = require('township')

runServer(function (err, serv, add) {
  if (err) throw err
})

function runServer (cb) {
  var creds = {
    host: 'http://127.0.0.1',
    port: 9966,
    requiredScopes: {
      useAPI: 'api:access'
    },
    email: {
      fromEmail: 'hi@example.com',
      postmarkAPIKey: 'your api key'
    },
    algorithm: 'ES512'
  }

  creds.publicKey = `-----BEGIN PUBLIC KEY-----
  MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAvmJlA/DZl3SVKNl0OcyVbsMTOmTM
  qU0Avhmcl6r8qxkBgjwArIxQr7G7v8m0LOeFIklnmF3sYAwA+8llHGFReV8ASW4w
  5AUC8ngZThaH9xk6DQscaMmoEFPN5thWpNcwMgUFYovBtPLwtAZjYr9Se+UT/5k4
  VltW7ko6SHbCfMgUUbU=
  -----END PUBLIC KEY-----`

  creds.privateKey = `-----BEGIN EC PRIVATE KEY-----
  MIHbAgEBBEFmz7VMXRtCPTlBETqMMx/mokyA3xPXra2SkcA7Xh0N6sgne1rgSZNU
  ngT6TR3XLfBOt5+p5GRW6p1FVtn+vtPyRKAHBgUrgQQAI6GBiQOBhgAEAL5iZQPw
  2Zd0lSjZdDnMlW7DEzpkzKlNAL4ZnJeq/KsZAYI8AKyMUK+xu7/JtCznhSJJZ5hd
  7GAMAPvJZRxhUXlfAEluMOQFAvJ4GU4Wh/cZOg0LHGjJqBBTzebYVqTXMDIFBWKL
  wbTy8LQGY2K/UnvlE/+ZOFZbVu5KOkh2wnzIFFG1
  -----END EC PRIVATE KEY-----`

  var app = createApp(creds)
  var server = http.createServer(app)

  server.listen(creds.port, function (err) {
    if (err) return cb(err)
    cb(null, server, creds.host + ':' + creds.port)
  })
}

function createApp (config) {
  var app = appa({log: {level: 'silent'}})
  var db = memdb()
  app.db = db
  var ship = township(config, db)

  app.on('/register', function (req, res, ctx) {
    ship.register(req, res, ctx, function (err, code, data) {
      if (err) return app.error(res, code, err.message)
      app.send(res, code, data)
    })
  })

  app.on('/login', function (req, res, ctx) {
    ship.login(req, res, ctx, function (err, code, data) {
      if (err) return app.error(res, code, err.message)
      app.send(res, code, data)
    })
  })

  app.on('/updatepassword', function (req, res, ctx) {
    ship.updatePassword(req, res, ctx, function (err, code, data) {
      if (err) return app.error(res, code, err.message)
      app.send(res, code, data)
    })
  })

  app.ship = ship

  return app
}
