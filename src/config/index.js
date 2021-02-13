import './environment'
import Express from 'express'
import Cors from 'cors'
import Path from 'path'

const Server = () => {
  const app = Express()
  app.use(Express.json())
  app.use(Cors())
  app.use(Express.urlencoded({ extended: true }))
  app.use(Express.static(Path.join(__dirname, 'public')))

  return app
}

export default Server