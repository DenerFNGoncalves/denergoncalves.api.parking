process.env.NODE_ENV = 'test'

import App from "../src/app"
import Server from "../src/config"

import Chai from 'chai'
import ChaiHttp from 'chai-http'
import CustomError from "../src/app/utils/custom-error"

const runTests = (() => {
  const server = App.use(new Server())
  server.start()
  let should = Chai.should()

  Chai.use(ChaiHttp)
  describe('parking', () => {
    beforeEach((done) => {

      done()
    })
  })

  describe('/POST parking', () => {
   
    it('it should RESULT on parking spot', (done) => {
      Chai.request(server._app)
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
  })

  it('it should DENY REQUEST on parking spot', (done) => {
    Chai.request(server._app)
      .post('/api/parking')
      .send({ plate: 'A32A-9342' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.include.keys(['errors'])
        done()
      })
  })
  
})


runTests()