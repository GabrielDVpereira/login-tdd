//esse arquivo percorre todas as nossas tabelas e deletam todos os dados de dentro

const { sequelize } = require('../../src/app/models');

module.exports = () => {
   return Promise.all(Object.keys(sequelize.model).map(key => {
        return sequelize.models[key].destroy({truncate: true, force: true});
    }))
}