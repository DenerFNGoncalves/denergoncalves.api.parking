import env from 'dotenv'

const config = (() => {
  env.config()
})()

export default config
