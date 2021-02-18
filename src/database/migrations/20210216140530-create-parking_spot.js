'use strict'

module.exports = {
  up: async (iquery, Sequelize) => {
    return iquery.createTable('parking_spot', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      left: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      check_in: {
        type: Sequelize.DATE,
        allowNull: false
      },
      check_out: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => (new Date())
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  down: async (iquery, Sequelize) => { }
}
