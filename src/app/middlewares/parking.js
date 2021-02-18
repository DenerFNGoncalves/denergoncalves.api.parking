import ParkingValidator from '../validators/parking-spot'

export default class ParkingMiddleware {

  static async beforePost(req, _, next) {
    const body = req.body || {}
    const vtor = new ParkingValidator()

    vtor.validatePost(body)
      .then(spot => {
        req.body = spot
        next()
      })
      .catch((err) => next(err))
  }

  static async beforePut(req, _, next) {
    const { id = 0} = req.params || {}
    const vtor = new ParkingValidator()

    vtor.validatePut(id)
      .then(() => next())
      .catch((err) => next(err))
  }
}