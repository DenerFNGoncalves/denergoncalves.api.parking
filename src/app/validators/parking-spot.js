import BaseValidator from './base'
import ParkingSpot from '../models/parking-spot'

const PLATE_EXPRESSION = /^(\w){3}-(\d){4}$/g

class ParkingValidator extends BaseValidator {

  constructor() {
    super(ParkingSpot)
  }

  async validatePost(data) {
    const spot = super.transform(data)

    const err =
      this.validateMask(spot.plate)
      || await this.errorIfExistsByPlate(spot.plate)

    return err
      ? Promise.reject(err)
      : Promise.resolve(spot)
  }

  async validatePutCheckout(id) {
    if (!id)
      return Promise.reject(super.newError("Invalid request"))

    const err =  await this.errorIfNotPaidOrNotExist(id)
   
    return err
      ? Promise.reject(err)
      : Promise.resolve()
  }

  // since model was designed without need of paid value
  // this method only tests id, otherwise the value could be validated here
  async validatePutPayment(id) {
    if (!id)
      return Promise.reject(super.newError("Invalid request"))

    const err =  await this.errorIfJustPaidOrNotExist(id)
   
    return err
      ? Promise.reject(err)
      : Promise.resolve()
  }

  async errorIfJustPaidOrNotExist(id) {
    return ParkingSpot.findOne({
      where: { id, left: false },
      attributes: ['id', 'paid']
    })
      .then(result => {
        if (!result)
          return Promise.reject(super.newError("No record found."))
        
        else if(result.paid) // the diff from errorIfNotPaid
          return Promise.reject(super.newError("This reserve was already paid"))
      
        return false
      })
      .catch(e => e)
  }

  async errorIfNotPaidOrNotExist(id) {
    return ParkingSpot.findOne({
      where: { id, left: false },
      attributes: ['id', 'paid']
    })
      .then(result => {
        if (!result)
          return Promise.reject(super.newError("No record found."))
        
        else if(!result.paid)
          return Promise.reject(super.newError("Must be paid before leaving"))
      
        return false
      })
      .catch(e => e)
  }
  
  async errorIfExistsByPlate(plate) {
    return ParkingSpot.findOne({ where: { plate, left: false }, attributes: ['id'] })
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