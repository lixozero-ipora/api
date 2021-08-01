import { Router } from 'express'
import SessionController from '../controllers/SessionController'

const route = Router()

route.post('/', SessionController.store)

export default route
