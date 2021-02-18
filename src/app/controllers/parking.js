import ParkingSpot from "../models/parking-spot"

class ParkingController {

  async doCheckin(data) {
   return ParkingSpot.create(data)
      .then(spot => spot.id) //since it's just a sample, considering spot-id as the reserved spot
      .catch(err => {
        return Promise.reject(
          new Error(`Could not reserve a parking spot. Errs: ${err.message}`))
      })
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
  async post(req, res, next) {
    const { body } = req

    return new ParkingController()
      .doCheckin(body)
      .then((reserved) => res.status(200).json({success: true, reserved }))
      .catch(err => next(err))
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