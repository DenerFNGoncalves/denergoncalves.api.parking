import Sequelize from 'sequelize'
import { loadModules } from '../app/utils/modules-loader'
import Path from 'path'
import Logger from './logger'

export default class DbContext {
  constructor({ database, username, password, dialect, host }) {
    this.__connection = new Sequelize(database, username, password, {
      host: host,
      dialect: dialect,
      logging: (msg) => Logger.info(msg)
    })

    this.__init()
  }

  /**
   * Set sequelize connection to the models
  **/
  __init() {
    const models = loadModules(Path.resolve(__dirname, '../app/models'), ['base.js'])
    models.map(m => {
      if (m && m.init) {
        m.init({
          sequelize: this.__connection,
          freezeTableName: true,
          paranoid: false,
          underscored: true
        })
      }
    })
  }
}
