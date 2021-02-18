process.env.NODE_ENV='test'

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
    const srv = new Server()
    this.server = srv.get()
    App.use(srv).start()

    before(this.destroyData)
  }

  destroyData(done) {
    ParkingSpot.destroy({
      where: { plate: "AAA-9342"},
      truncate: false
    })
      .then(() => done())
      .catch(() => done())
  }

  run() {
    this.testPost()
    this.testPut()
  }

  testPost() {
    describe('/POST parking', () => {
      it('it should RESULT on parking spot', (done) => {
        Chai.request(this.server)
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
        Chai.request(this.server)
          .post('/api/parking')
          .send({ plate: 'A32A-9342' })
          .end((err, res) => {
            res.should.have.status(400)
            res.body.should.include.keys(['errors'])
            done()
          })
      })

      it('It should deny request no plate value sent', (done) => {
        Chai.request(this.server)
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

  testPut() {
    describe('/PUT/:id/out parking', () => {
      it('it should result on a 404 unknown request', (done) => {
        Chai.request(this.server)
          .put('/api/parking/XX/out')
          .end((err, res) => {
            res.should.have.status(404)
            done()
          })
      })

      it('It should result on a 400 error request, record not found', (done) => {
        Chai.request(this.server)
          .put('/api/parking/23/out')
          .end((err, res) => {
            res.should.have.status(400)
            res.body.should.include.keys(['errors'])
            done()
          })
      })

      it('It should deny request since was not paid', (done) => {
        Chai.request(this.server)
          .put('/api/parking/2/out')
          .end((err, res) => {
            res.should.have.status(400)
            res.body.should.include.keys(['errors'])
            done()
          })
      })
      
      it('It should result on success', (done) => {
        Chai.request(this.server)
          .put('/api/parking/1/out')
          .end((err, res) => {
            res.should.have.status(200)
            done()
          })
      })

          
      it('It should result on 400 error request, since last test already checked it out ', (done) => {
        Chai.request(this.server)
          .put('/api/parking/1/out')
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
  }
}

new ParkingTests().run()