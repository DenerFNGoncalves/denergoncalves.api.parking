import ctr from '../controllers/parking'
import mwr from '../middlewares/parking'

const name = '/parking'

export default {
  use: ({router}) => {
    router.post(name, mwr.beforePost, ctr.post)
    router.put(`${name}/:id([0-9]{1,5})/out`, mwr.beforePut, ctr.put)
  }
}