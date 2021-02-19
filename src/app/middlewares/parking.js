import ParkingValidator from '../validators/parking-spot'

export default class ParkingMiddleware {

  static async beforePost(req, _, next) {
    const body = req.body || {}
    const vtor = new ParkingValidator()

    vtor.validatePost(body)
      .then(() => next())
      .catch((err) => next(err))
  }

  static async beforePutCheckout(req, _, next) {
    const { id = 0} = req.params || {}
    const vtor = new ParkingValidator()

    vtor.validatePutCheckout(id)
      .then(() => next())
      .catch((err) => next(err))
  }
  
  static async beforePutPayment(req, _, next) {
    const { id = 0} = req.params || {}
    const vtor = new ParkingValidator()

    vtor.validatePutPayment(id)
      .then(() => next())
      .catch((err) => next(err))
  }

  static async beforeGet(req, _, next) {
    const { plate } = req.params || {}

    const vtor = new ParkingValidator()
    vtor.validateGet(plate)
      .then(() => next())
      .catch((err) => next(err))
  }
}