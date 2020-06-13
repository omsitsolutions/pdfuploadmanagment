const routes = require('express').Router()
const authMiddleware = require('./app/middlewares/auth')
const AuthController = require('./app/controllers/AuthController')
const DocumentController = require('./app/controllers/DocumentController')

routes.post('/sessions', AuthController.login)
routes.post('/create', AuthController.create)

routes.use(authMiddleware)
routes.get('/documents', DocumentController.getDocumentsByUser)
routes.post('/documents/store', DocumentController.store)

module.exports = routes