//describe é a categoria dos meus testes, it é a função do teste
const request = require('supertest'); // feito para testar rotas em uma aplicação
const app  = require('../../src/app'); //require onde o express foi declarado
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {
    // beforeAll() - executa uma vez antes de todos os testes do arquivo
    // beforeEach() - executa antes de cada teste
    // afterEach() - executa depois de cada teste 
    // afterAll() - executa uma vez depois de todos os testes

    beforeEach(async () => {
        await truncate(); //limpa todo o banco antes de começar os testes
    })
    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('User', {
            password: '123321'
        })
        
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password:'123321'
            })
        expect(response.status).toBe(200); //sucess status
    });

    it('should not authenticate with invalid credentials ', async() => {
        const user = await factory.create('User', {
            password: '123321'
        })
        
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password:'123456'
            })
        expect(response.status).toBe(401); //erro de não autorizado
    });

    it('should return a jwt token when authenticated', async () => {
        const user = await factory.create('User', {
            password: '123321'
        })
        
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password:'123321'
            })
        expect(response.body).toHaveProperty("token"); 
        });
    
    it('should be able to acess private routes when authenticated', async ()=> {
        
        const user = await factory.create('User', {
            password: '123321'
        })
        
        const response = await request(app)
            .get('/dashboard')
            .set("Authorization", `Bearer ${user.generateToken()}`) //setando o header para autenticar somente na presença de um token
        expect(response.status).toBe(200); 
    })

    it('should not be able to acess private routes whithout jwt token', async()=>{
        const user = await factory.create('User', {
            password: '123321'
        })
        
        const response = await request(app)
            .get('/dashboard')

            expect(response.status).toBe(401); 
    })

    it('should not be able to acess private routes with invalid jwt token', async () => {
        const user = await factory.create('User', {
            password: '123321'
        })
        
        const response = await request(app)
            .get('/dashboard')
            .set("Authorization", `Bearer 4444`) //setando o header para autenticar somente na presença de um token
        expect(response.status).toBe(401); 
    })
})
