const routes = require('express').Router()
const UserController = require('../../controllers/userController')

routes.use('/getStar/:username', UserController.getStars )
routes.use('/createRepo', UserController.createRepo )
routes.use('/otherRepo/:username', UserController.showRepo )
routes.use('/unstar/:owner/:repo', UserController.unstar )



module.exports = routes