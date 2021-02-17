import BaseValidator from './base'
import ParkingSpot from '../models/parking-spot'

const PLATE_EXPRESSION = /^(\w){3}-(\d){4}$/g

class ParkingValidator extends BaseValidator {

  constructor() {
    super(ParkingSpot)
  }

  async validatePost(data) {
    const spot = super.transform(data)

    let err =
      this.validateMask(spot.plate)
      || await this.errorIfExistsByPlate(spot.plate)

    return err
      ? Promise.reject(err)
      : Promise.resolve(spot)
  }

  async errorIfExistsByPlate(plate) {
    ParkingSpot.findOne({ where: { plate }, attributes: ['id'] })
      .then(exists => {
        return exists
          ? super.newError('The given plate already parking...')
          : false
      })
      .catch(err => err)
  }

  validateMask(plate) {
    if (!plate || plate === '')
      return super.newError("Plate must be informed")

    const valid = new RegExp(PLATE_EXPRESSION).test(plate)

    return valid
      ? false
      : super.newError("Plate should be in format: AAA-0000")

  }
}


export default ParkingValidator