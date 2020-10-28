var express = require('express')
var router = express.Router()
const fs = require('fs')

/* GET home page. */
router.post('/', function(req, res, next) {
  fs.writeFileSync(`../server/public/${req.query.filename}`, req.body.content)
  res.send('')
  res.end()
})

module.exports = router
