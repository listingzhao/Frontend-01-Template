const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const archiver = require('archiver')
const child_process = require('child_process')

let filename = './cat.jpg'

let packname = './package'

let redirect_uri = encodeURIComponent('http://localhost:8081/auth?id=123')
child_process.exec(
  `open https://github.com/login/oauth/authorize?client_id=Iv1.e7d869d9d39f0476&redirect_uri=${redirect_uri}&state=123abc`
)
const server = http.createServer((request, res) => {
  let token = request.url.match(/token=([^&]+)/)[1]
  console.log('real publish!!')
  const options = {
    host: 'localhost',
    port: 8081,
    path: `/index?filename=package.zip`,
    method: 'POST',
    headers: {
      token: token,
      'Content-Type': 'application/octet-stream'
    }
  }

  const req = http.request(options, res => {
    console.log(res.statusCode)
    console.log(JSON.stringify(res.headers))
  })

  req.on('error', e => {
    console.error(`problem with request: ${e.message}`)
  })

  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  })

  archive.directory(packname, false)

  archive.pipe(req)

  archive.on('end', () => {
    req.end()
    console.log('publish success!!!')
    res.end('publish success!!!')
    server.close()
  })

  archive.finalize()
})

server.listen(8080)
