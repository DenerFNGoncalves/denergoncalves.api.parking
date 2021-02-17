import App from "../src/app"
import Server from "../src/config"

import Chai from 'chai'
import ChaiHttp from 'chai-http'
import ParkingSpot from "../src/app/models/parking-spot"

Chai.should()
Chai.use(ChaiHttp)

class ParkingTests {
  constructor() {
    // creating server
    this.server = new Server()
    App.use(this.server).start()

    before(this.destroyData)
  }

  destroyData(done) {
    ParkingSpot.destroy({
      where: {},
      truncate: true
    })
      .then(() => done())
      .catch(() => done())
  }

  run() {
    this.testPost(this.server.get())
  }

  testPost(server) {
    describe('/POST parking', () => {
      it('it should RESULT on parking spot', (done) => {
        Chai.request(server)
          .post('/api/parking')
          .send({ plate: 'AAA-9342' })
          .end((err, res) => {

            const body = res.body
            res.should.have.status(201)

            body.should.include.keys(['success', 'spot'])
            body.success.should.be.equal(true, "Message should result in success")
            body.spot.should.be.above(0, "Spot should be greater than 0")
            done()
          })
      })

      it('It should deny request using wrong mask on plate value', (done) => {
        Chai.request(server)
          .post('/api/parking')
          .send({ plate: 'A32A-9342' })
          .end((err, res) => {
            res.should.have.status(400)
            res.body.should.include.keys(['errors'])
            done()
          })
      })

      it('It should deny request no plate value sent', (done) => {
        Chai.request(server)
          .post('/api/parking')
          .send({})
          .end((err, res) => {
            res.should.have.status(400)
            res.body.should.include.keys(['errors'])
            done()
          })
      })
    })
  }
}

new ParkingTests().run()