import Base from './base'

export default class ParkingSpot extends Base {

  static init(opts) {
    super.init({ ...opts, tableName: 'parking_spot' })
  }

  static definition() {
    const common = super.definition()

    return {
      ...common,
      id: {
        primaryKey: true,
        autoIncrement: true,
        notNull: true,
        type: this.types.INTEGER
      },
      plate: {
        type: this.types.STRING,
        notNull: true
      },
      paid: {
        type: this.types.BOOLEAN,
        notNull: true,
        defaultValue: false
      },
      left: {
        type: this.types.BOOLEAN,
        notNull: true,
        defaultValue: false
      },
      checkIn: {
        type: this.types.DATE,
        notNull: true,
        defaultValue: () => (new Date())
      },
      checkOut: {
        type: this.types.DATE,
        notNull: false
      }
    }
  }

}