import { Router } from 'express'
import ComplaintController from '../controllers/ComplaintController'

const route = Router()

route.post('/complaints', ComplaintController.store)

export default route
