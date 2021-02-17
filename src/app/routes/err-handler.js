import CustomError from "../utils/custom-error"

const ErrorHandler = async (err, req, res, _) => {
  if (err instanceof CustomError)
    return res.status(err.code).json(err)

  const { message } = err
  let errors, code = message

  switch (message) {
    case '404': errors = ['Unknown request.']; break
    case '403': errors = ['Permission denied.']; break
    case '401': errors = ['Token not providen or invalid.']; break
    default: {
      code = '500'
      errors = [message]
      break
    }
  }

  return res.status(code).json({
    success: false,
    errors
  })
}

export default ErrorHandler