const routes = require('express').Router()
const session = require('./app/controllers/SessionController')
//definição das rotas 

const authMiddleware = require("./app/middleware/auth");

routes.post('/sessions', session.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
})
module.exports= routes;