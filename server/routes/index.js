const routes = require('express').Router()
const user = require('./user')

routes.use('/user', user)



module.exports = routes