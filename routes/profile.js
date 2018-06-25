const express = require('express')
const router = express.Router()
const fields = [
  { label: 'First Name', name: 'firstName', required: true },
  { label: 'Last Name', name: 'lastName', required: true },
  { label: 'Address', name: 'streetAddress' },
  { label: 'City', name: 'city' },
  { label: 'State', name: 'state' },
  { label: 'Zip Code', name: 'zipCode' },
  { label: 'Birthday', name: 'birthdate', type: 'date' },
  { label: 'Favorite Color', name: 'favoriteColor' },
]

router.post('/', async (req, res, next) => {
  try {
    Object.assign(req.user.profile, req.body)

    await req.user.update()
  } catch (error) {
    console.log(error)
  }

  next()
})

router.use('/', (req, res, next) => {
  res.render('profile', {
    title: 'Profile',
    user: req.user,
    fields: fields.map(field => ({
      ...field,
      value: req.user.profile[field.name],
    })),
  })
})

module.exports = router
