const routes = require('express').Router()
const authMiddleware = require('./app/middlewares/auth')
const AuthController = require('./app/controllers/AuthController')

routes.post('/sessions', AuthController.login)

routes.use(authMiddleware)
routes.get('/documents', (req, res) => {
    res.status(200).send()
})

module.exports = routes