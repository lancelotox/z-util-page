const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer()

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  delete req.headers.realdomain
})

const server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.end()
    return
  }
  proxy.web(req, res, {
    target: req.headers.realdomain,
    changeOrigin: true
  })
  proxy.on('error', function (err) {
    console.log(err)
  })
})

module.exports = {
  server
}
