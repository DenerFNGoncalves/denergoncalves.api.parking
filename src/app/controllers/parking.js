

class ParkingController {

  async insert({ data }) {
    //TODO
    return { success: true, spot: 5 }
  }


}

export default {
  async post(req, res) {
    const { body } = req
    var result = await new ParkingController().insert({ body })

    const status = result.err ? 500 : 201

    return res.status(status).json(result)
  }

}