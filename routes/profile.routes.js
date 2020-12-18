const app = require('express').Router()
const auth = require('../controllers/auth/auth.controllers')
const controller = require('../controllers/profile.controller')

app.get('/profile', auth, (req, res) => { res.redirect('/feed') })

app.get('/profile/:username', auth, controller.profile)

module.exports = app