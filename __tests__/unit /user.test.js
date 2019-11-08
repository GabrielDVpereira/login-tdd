const { User } = require('../../src/app/models'); 
const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');

describe('user', ()=>{
    beforeEach( async()=>{
        await truncate();
    })

    it('should encrypt user password', async() => {
    })
})
