import { Router } from 'express'
import ScheduleController from '../controllers/ScheduleController'
import authMiddleware from '../middleware/Auth'

const routes = Router()

const schedulesController = new ScheduleController()

routes.get('/', schedulesController.index)
routes.get('/:id', authMiddleware, schedulesController.show)
routes.put('/', authMiddleware, schedulesController.update)

export default routes
