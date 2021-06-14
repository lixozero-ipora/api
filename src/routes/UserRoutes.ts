import { Router } from 'express'
import UserController from '../controllers/UserController'

const route = Router()

route.post('/users', UserController.store)

export default route
