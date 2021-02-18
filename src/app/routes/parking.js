import ctr from '../controllers/parking'
import mwr from '../middlewares/parking'

const name = '/parking'
const id = ':id([0-9]{1,5})'
const plate = ':plate([A-Z]{3}\-[0-9]{4})' // eslint-disable-line no-useless-escape

export default {
  use: ({router}) => {
    router.post(name, mwr.beforePost, ctr.post)
    router.get(`${name}/${plate}`, mwr.beforeGet, ctr.get)
    router.put(`${name}/${id}/out`, mwr.beforePutCheckout, ctr.putCheckout)
    router.put(`${name}/${id}/pay`, mwr.beforePutPayment, ctr.putPayment)
  }
}