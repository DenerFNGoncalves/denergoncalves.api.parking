'use strict';

module.exports = {
  up: async (iqry) => {
    return iqry.bulkInsert('parking_spot', [
      {
        id: 4,
        plate: 'DDD-3333',
        paid: true,
        left: false,
        check_in: new Date(),
        check_out: new Date(),
        created_at: new Date(),
      },
      {
        id: 5,
        plate: 'HAT-3451',
        paid: false,
        left: false,
        check_in: new Date(),
        check_out: new Date(),
        created_at: new Date(),
      }
    ])
  },

  down: async (iqry, Sequelize) => {
    
    return iqry.bulkDelete('parking_spot', null, {
      where: { "id": { [Sequelize.Op.between]: [4, 5] } }
    }) 
  }
};
