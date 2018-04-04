const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const descriptionList = Object.keys(req.userinfo).sort()
    .map(term => ({ term, details: req.userinfo[term] }));

  const data = Object.assign({ descriptionList }, req.userinfo);

  res.render('dashboard', data);
});

module.exports = router;
