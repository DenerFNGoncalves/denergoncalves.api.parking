import { loadModules } from '../utils/modules-loader'
import { Router } from 'express'
import ErrorHandler from './err-handler'


// avoid magical vars
const ROUTE_PREFIX = '/api'

export default {
  use: ({ server }) => {
    const router = new Router()

    loadModules(__dirname, ['errorHandler'])
      .forEach(f => {
        if (f && f.use) f.use({ router })
      })

    server.use(ROUTE_PREFIX, router)
    server.use("*", () => { throw new Error(404) })
    server.use(ErrorHandler)
  }
}


