import ParkingSpot from "../models/parking-spot"

class ParkingController {
  async insert(data) {
    return ParkingSpot.create(data.dataValues, {})
      .then(spot => spot.id)
      .catch(err => err)
  }

  async doCheckout(id) {
    const body = {
      left: true, // vehicle left the parking
      checkOut: new Date(), // when
      updatedAt: new Date()
    }

    const result = await ParkingSpot.update(body, {
      where: { id },
      fields: ['left', 'checkOut', 'updatedAt']
    })

    if (!result[0]) // no rows affected
      return Promise.reject(new Error(`Could not update (id:${id})`))
    
    return Promise.resolve()
  }
}

export default {
  async post(req, res) {
    const { body } = req

    return new ParkingController()
      .insert(body)
      .then(result => {
        return res.status(201).json({
          spot: result,
          success: true
        })
      })
      .catch(err => {
        return res.status(500).json(err)
      })
  },

  async put(req, res, next) {
    const { id=0 } = req.params

    return new ParkingController().doCheckout(id)
      .then( () => {
        return res.status(200).json({
          success: true,
          message: "Check out realized successfully."
        })
      })
      .catch(err => next(err))
      
  }

}