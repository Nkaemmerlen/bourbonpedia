import { Router } from "express"
const router = Router()
import * as bourbonsCtrl from '../controllers/bourbons.js'
import { isLoggedIn } from '../middleware/middleware.js'


router.get('/new', isLoggedIn, bourbonsCtrl.new)
router.post('/', isLoggedIn, bourbonsCtrl.create)
router.get('/', isLoggedIn, bourbonsCtrl.index)
router.get('/:id', isLoggedIn, bourbonsCtrl.show)
router.post('/:id/reviews', isLoggedIn, bourbonsCtrl.createReview)
router.delete('/:id', isLoggedIn, bourbonsCtrl.delete)
router.get('/:id/edit', isLoggedIn, bourbonsCtrl.edit)
router.put('/:id', isLoggedIn, bourbonsCtrl.update)
router.post('/:id/prices', isLoggedIn, bourbonsCtrl.createPrice)



export {
  router
}