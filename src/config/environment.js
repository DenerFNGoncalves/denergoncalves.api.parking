import env from 'dotenv'
env.config()

import db from './dbconfig'

export default {
  server: {
    port: process.env.PORT
  },
  db: db[process.env.NODE_ENV]
}
