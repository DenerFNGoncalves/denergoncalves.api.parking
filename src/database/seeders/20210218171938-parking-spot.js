'use strict'

module.exports = {
  up: async (iqry) => {
    return iqry.bulkInsert('parking_spot', [
      {
        id: 6,
        plate: 'FUR-2000',
        paid: true,
        left: true,
        check_in: '2021-02-16T16:30:00.000Z',
        check_out: '2021-02-16T17:00:00.000Z',
        created_at: '2021-02-16T16:30:00.000Z',
      },
      {
        id: 7,
        plate: 'FUR-2000',
        paid: true,
        left: true,
        check_in: '2021-02-17T14:25:00.000Z',
        check_out: '2021-02-17T17:00:00.000Z',
        created_at: '2021-02-17T14:25:00.000Z',
      },
      {
        id: 8,
        plate: 'FUR-2000',
        paid: true,
        left: true,
        check_in: '2021-02-18T10:00:00.000Z',
        check_out: '2021-02-18T12:00:00.000Z',
        created_at: '2021-02-18T10:00:00.000Z',
      },
      {
        id: 9,
        plate: 'DBA-5432',
        paid: true,
        left: true,
        check_in: '2021-02-18T00:00:00.000Z',
        check_out: null,
        created_at: '2021-02-18T00:00:00.000Z',
      }
    ])
  },

  down: async (iqry, Sequelize) => {
    return iqry.bulkDelete('parking_spot', null, {
      where: { "id": { [Sequelize.Op.between]: [6, 9] } }
    })
  }
}
