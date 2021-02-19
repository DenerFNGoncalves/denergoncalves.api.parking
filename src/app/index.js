import Routes from './routes'

export default {
  use: (server) => {
    Routes.use({ server })
    return server
  }
}
