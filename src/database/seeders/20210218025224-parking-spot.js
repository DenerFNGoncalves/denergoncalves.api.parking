'use strict'

module.exports = {
  up: async (iqry) => {
    return iqry.bulkInsert('parking_spot', [
      {
        id: 1,
        plate: 'ABC-1234',
        paid: true,
        left: false,
        check_in: new Date(),
        check_out: new Date(),
        created_at: new Date(),
      },
      {
        id: 2,
        plate: 'CCC-7985',
        paid: false,
        left: false,
        check_in: new Date(),
        check_out: new Date(),
        created_at: new Date(),
      },
      {
        id: 3,
        plate: 'LOV-3111',
        paid: true,
        left: true,
        check_in: new Date(),
        check_out: new Date(),
        created_at: new Date(),
      }
    ])
  },

  down: async (iqry) => {
    return iqry.bulkDelete('parking_spot', null, {})
  }
}
