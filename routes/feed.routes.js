const app = require('express').Router()
const auth = require('../controllers/auth/auth.controllers')
const controller = require('../controllers/feed.controller')

app.get('/feed', auth, controller.feed)

app.post('/handleAddPost', auth, controller.handleAddPost)

module.exports = app