const okta = require('@okta/okta-sdk-nodejs');
const express = require('express');

const router = express.Router();

const client = new okta.Client({
  orgUrl: process.env.ORG_URL,
  token: process.env.REGISTRATION_TOKEN,
});

const title = 'Create an account';

router.get('/', (req, res, next) => {
  if (req.userinfo) {
    return res.redirect('/');
  }

  res.render('register', { title });
});

router.post('/', async (req, res, next) => {
  try {
    const user = await client.createUser({
      profile: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        login: req.body.email,
      },
      credentials: {
        password: {
          value: req.body.password,
        },
      },
    });

    res.redirect('/dashboard');
  } catch ({ errorCauses }) {
    const errors = errorCauses.reduce((summary, { errorSummary }) => {
      const [ match, field, error ] = /^(.+?): (.+)$/.exec(errorSummary);
      return Object.assign({ [field]: error }, summary);
    }, {});

    console.log(errors);

    res.render('register', { title, errors });
  }
});

module.exports = router;
