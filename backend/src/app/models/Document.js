const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {

    const Document = sequelize.define("Document", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        id_user: DataTypes.INTEGER,
        name: DataTypes.STRING,
        size: DataTypes.STRING,
        path: DataTypes.STRING
    })

    Document.prototype.toJSON =  function () {
        var values = Object.assign({}, this.get());
      
        delete values.id_user;
        return values;
    }
    
    return Document
}