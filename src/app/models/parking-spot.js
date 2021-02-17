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
        type: this.types.INTEGER
      },
      plate: {
        type: this.types.STRING,
        required: true
      },
      paid: {
        type: this.types.BOOLEAN,
        required: true,
        defaultValue: false
      },
      left: {
        type: this.types.BOOLEAN,
        required: true,
        defaultValue: false
      },
      checkIn: {
        type: this.types.DATE,
        required: true
      },
      checkOut: {
        type: this.types.DATE,
        required: true
      }
    }
  }

}