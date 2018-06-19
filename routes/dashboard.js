const express = require('express')
const { startCase } = require('lodash')

const router = express.Router()

router.get('/', function (req, res, next) {
  const { profile } = req.user
  const descriptionList = Object.keys(profile).sort()
    .map(key => ({
      term: startCase(key),
      details: profile[key],
    }))
    .filter(({ details }) => details)

  res.render('dashboard', {
    title: 'Dashboard',
    descriptionList,
    user: req.user,
  })
})

module.exports = router
