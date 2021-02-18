import ParkingSpot from "../models/parking-spot"

class ParkingController {
  async insert(data) {
    return ParkingSpot.create(data.dataValues, {})
      .then(spot => spot.id)
      .catch(err => err)
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


  }

}