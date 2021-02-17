import ctr from '../controllers/parking'
import mwr from '../middlewares/parking'

const name = '/parking'

export default {
  use: ({router}) => {
    router.post(name, mwr.beforePost, ctr.post)
  }
}