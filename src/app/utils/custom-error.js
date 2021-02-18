export default class CustomError extends Error {
  constructor({ code, ...messages }) {
    super()
    this.code = code
    this.errors = Object.values(messages)
    this.success = false

    Object.defineProperty(CustomError.prototype, 'toJSON', {
      value: function () {
        var alt = {
          success: this.success,
          errors: this.errors
        }
        return alt
      },
      configurable: true,
      writable: true,
      logging: true
    })
  }
}
