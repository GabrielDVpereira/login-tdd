const { User } = require('../../src/app/models'); 
const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');

describe('user', ()=>{
    beforeEach( async()=>{
        await truncate();
    })

    it('should encrypt user password', async() => {
        const user = await User.create({name: 'Gabriel', email: 'g@teste.com', password: '123456'})
        const hash = await bcrypt.hash('123456', 8);
        const compareTest = await bcrypt.compare('123456', user.password_hash);
        expect(compareTest).toBe(true);
    })
})
