const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_req: DataTypes.VIRTUAL,
        password: DataTypes.STRING
    }, {
        hooks: {
            beforeSave: async user => {
                if(user.password_req){
                    user.password = await bcrypt.hash(user.password_req, 8)
                }
            }
        }
    })

    User.prototype.toJSON =  function () {
        var values = Object.assign({}, this.get());
        
        delete values.id;
        delete values.password;
        delete values.password_req;
        
        return values;
    }

    User.prototype.comparePassword = function(password) {
        return bcrypt.compare(password, this.password)
    }

    User.prototype.generateTokenUser = function() {
        return jwt.sign({ id: this.id }, process.env.APP_SECRET)
    }

    return User
}