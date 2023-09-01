const express = require('express')
const route = express.Router()
const homeController = require("./src/controllers/homeController")
const loginController = require("./src/controllers/loginController")
const contactController = require("./src/controllers/contactController")
const { loginRequired } = require("./src/middlewares/middleware")

// Home routes
route.get('/', homeController.index)

// Login routes
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/signin', loginController.signin)
route.get('/login/logout', loginController.logout)

// Contact routes
route.get('/contacts', loginRequired, contactController.index)
route.post('/contacts/register', loginRequired, contactController.register)
route.get('/contacts/:id', loginRequired, contactController.contactDetails)
route.post('/contacts/edit/:id', loginRequired, contactController.edit)
route.get('/contacts/delete/:id', loginRequired, contactController.delete)


module.exports = route;