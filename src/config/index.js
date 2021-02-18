import config from './environment'
import Express from 'express'
import Cors from 'cors'
import Path from 'path'
import DbContext from './dbcontext'
import Logger from './logger'

class Server {
  constructor() {
    this._app = Express()
    this.__init()
  }

  __init() {
    this._app.use(Express.json())
    this._app.use(Cors())
    this._app.use(Express.urlencoded({ extended: true }))
    this._app.use(Express.static(Path.join(__dirname, 'public')))
    this.db = new DbContext(config.db)
  }


  use(value, midlefunc) {
    if (typeof value === 'string')
      this._app.use(value, midlefunc)
    else
      this._app.use(value)
  }

  start() {
    this._app.listen(config.server.port, () => {
      Logger.info(" ======= SERVER RUNING ======= \n")
    })
  }

  get() {
    return this._app
  }
}

export default Server