const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Simple Node Authentication',
    userinfo: req.userinfo
  })
})

module.exports = router
