const routes = require('express').Router()
const authMiddleware = require('./app/middlewares/auth')
const AuthController = require('./app/controllers/AuthController')
const DocumentController = require('./app/controllers/DocumentController')

routes.post('/auth', AuthController.login)
routes.post('/create', AuthController.create)

routes.use(authMiddleware)
routes.get('/documents', DocumentController.getDocumentsByUser)
routes.post('/documents/store', DocumentController.store)
routes.post('/documents/viewer', DocumentController.viewer)
routes.get('/documents/details', DocumentController.details)

module.exports = routes