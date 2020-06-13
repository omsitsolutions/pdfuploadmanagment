'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('documents', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_user: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id', 
          },
          allowNull: false
        },
        path: {
          type: Sequelize.STRING,
          allowNull: false
        },
        size: {
          type: Sequelize.STRING,
          allowNull: true
        },
        created_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false,
        }
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('documents')
  }
};