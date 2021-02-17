import Sequelize, { Model } from 'sequelize'

/**
 * An object that allows using Sequelize types from classes
 * that inherit "Base.class" without importing the library
 */
const types = ({
  INTEGER: Sequelize.INTEGER,
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  DATE: Sequelize.DATE,
  TIME: Sequelize.TIME,
  BOOLEAN: Sequelize.BOOLEAN
})

export default class Base extends Model {
  static init(opts) {
    this.types = types
    super.init(this.definition(), opts)

    return this
  }


  /**
   * Called by constructor. Here is used to add common attributes
   * to other classes inheriting Base
   */
  static definition() {
    return ({
      createdAt: {
        type: this.types.DATE,
        defaultValue: () => (new Date())
      },
      updatedAt: {
        type: this.types.DATE,
        defaultValue: () => (null)
      }

    })
  }

}
