

class ParkingController {

  async insert({ data }) {
    //TODO
    console.log(data)
    return { msg: "done" }
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