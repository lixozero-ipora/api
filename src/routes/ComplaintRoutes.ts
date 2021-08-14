import { Router } from 'express'
import ComplaintController from '../controllers/ComplaintController'
import authMiddleware from '../middleware/Auth'

const route = Router()

const complaintController = new ComplaintController()

route.post('/', complaintController.store)
route.get('/', authMiddleware, complaintController.index)
route.get('/:id', authMiddleware, complaintController.show)
route.put('/:complaintId', authMiddleware, complaintController.solve)
route.put('/:complaintId/unsolve', authMiddleware, complaintController.unsolve)

export default route
