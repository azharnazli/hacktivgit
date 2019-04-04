const routes = require('express').Router()
const UserController = require('../../controllers/userController')

routes.get('/', UserController.showUser )
routes.get('/getStar', UserController.getStars )
routes.post('/createRepo', UserController.createRepo )
routes.post('/otherRepo/', UserController.showRepo )
routes.delete('/unstar/:owner/:repo', UserController.unstar )
routes.post('/login', UserController.login )


module.exports = routes