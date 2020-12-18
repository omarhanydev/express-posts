const app = require('express').Router()
const validation = require('../validations/signup.validations')
const controller = require('../controllers/signup.controllers')

app.get('/signup', controller.signup)

app.post('/handleSignup', validation.handleSignup, controller.handleSignup)

module.exports = app