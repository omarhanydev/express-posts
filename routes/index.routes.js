const app = require('express').Router()
const validation = require('../validations/login.validations')
const controller = require('../controllers/login.controllers')

app.get('/', controller.login)

app.post('/handlelogin', validation.handlelogin, controller.handlelogin)

app.get('/logout', controller.logout)

module.exports = app