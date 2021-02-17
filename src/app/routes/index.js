import { loadModules } from '../utils/modules-loader'
import { Router } from 'express'

// avoid magical vars
const ROUTE_PREFIX = '/api'

export default {
  use: ({ server }) => {
    const router = new Router()

    loadModules(__dirname)
      .forEach(f => {
        if (f && f.use) f.use({ router })
      })

    server.use(ROUTE_PREFIX, router)
  }
}


