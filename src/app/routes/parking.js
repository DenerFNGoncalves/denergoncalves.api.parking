import ctr from '../controllers/parking'

const name = '/parking'

export default {
  use: ({router}) => {
    router.post(name, ctr.post)
  }
}