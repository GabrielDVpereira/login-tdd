require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
const express = require('express');



//Lógica de criação do servidor diferente da lógica de criação da porta, não há mistura nos testes
class AppController {
    constructor(){
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.use(express.json()); // Entende o modo json em requisições
    }

    routes(){
        this.express.use(require('./routes'));
    }
}

module.exports = new AppController().express;