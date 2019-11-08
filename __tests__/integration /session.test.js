//describe é a categoria dos meus testes, it é a função do teste
const request = require('supertest'); // feito para testar rotas em uma aplicação
const { User } = require('../../src/app/models'); 
const app  = require('../../src/app'); //require onde o express foi declarado
const truncate = require('../utils/truncate');

describe('Authentication', () => {
    // beforeAll() - executa uma vez antes de todos os testes do arquivo
    // beforeEach() - executa antes de cada teste
    // afterEach() - executa depois de cada teste 
    // afterAll() - executa uma vez depois de todos os testes

    beforeEach(async () => {
        await truncate(); //limpa todo o banco antes de começar os testes
    })
    it('should authenticate with valid credentials', async () => {
        const user = await User.create({
            name: 'Gabriel',
            email: 'gabriel.davi.99@gmail.com',
            password_hash: '123321'
        })
        
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password:'123456'
            })
        expect(response.status).toBe(200);
    
    })
});
