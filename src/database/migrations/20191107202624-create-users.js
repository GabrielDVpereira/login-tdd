'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

    */

      return queryInterface.createTable('users', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true, 
          autoIncrement: true, 
          allowNUll: false,
        },
        name: {
          type: Sequelize.STRING, 
          allowNUll: false
        },
        email: {
          type: Sequelize.STRING, 
          uinique: true,
          allowNUll: false,
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNUll: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNUll: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNUll: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

    */
      return queryInterface.dropTable('users');
    
  }
};
