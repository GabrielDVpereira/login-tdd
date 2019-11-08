const routes = require('express').Router()
const session = require('./app/controllers/SessionController')
//definição das rotas 

routes.post('/sessions', session.store)
module.exports= routes;