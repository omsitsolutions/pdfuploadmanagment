const routes = require('express').Router()

const AuthController = require('./app/controllers/AuthController')

routes.post('/sessions', AuthController.login)

module.exports = routes