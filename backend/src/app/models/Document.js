const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {

    const Document = sequelize.define("Document", {
        id_user: DataTypes.INTEGER,
        path: DataTypes.STRING
    })

    return Document
}