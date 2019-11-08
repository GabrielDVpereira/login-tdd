const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", {
        name: DataTypes.STRING, 
        email: DataTypes.STRING, 
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING
    },{
        hooks: {
            beforeSave: async user => {
                if(user.password){
                    user.password_hash = await bcrypt.hash(user.password, 8);
                }
            }
        }
    });
    //User.prototype cria um novo método para um model
    //comparando a senha com a senha salva no banco 
    User.prototype.checkPassword = function(password) {
        return bcrypt.compare(password, this.password_hash)
    }

    User.prototype.generateToken = function() {
        return jwt.sign({ id: this.id }, process.env.APP_SECRET); // segundo parametro se refere ao secret da aplicação
    }

    return User;
};