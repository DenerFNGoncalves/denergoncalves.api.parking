import CustomError from "../utils/custom-error"

export default class BaseValidator {
  constructor(model) {
    this.Model = model
  }

  transform(body) {
    try {
      return Object.assign(new (this.Model), body)
    } catch {
      throw new Error("Invalid request Body")
    }
  }

  newError(message) {
    return new CustomError({ code: '400', message })
  }
}