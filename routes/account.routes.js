const app = require('express').Router()
const auth = require('../controllers/auth/auth.controllers')
const validation = require('../validations/account.validations')
const controller = require('../controllers/account.controller')

app.get('/account', auth, controller.account)
app.post('/handleChangePassword', auth, validation.handleChangePassword, controller.handleChangePassword)

module.exports = app