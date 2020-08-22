const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const archiver = require('archiver')

let filename = './cat.jpg'

let packname = './package'

const options = {
  host: 'localhost',
  port: 8081,
  path: `/index?filename=package.zip`,
  method: 'POST',
  headers: {
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

archive.on('end', () => {
  req.end()
})

archive.pipe(req)

archive.finalize()
