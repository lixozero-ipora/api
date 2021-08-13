import { Router } from 'express'
import ComplaintController from '../controllers/ComplaintController'
import authMiddleware from '../middleware/Auth'

const route = Router()

const complaintController = new ComplaintController()

route.post('/', complaintController.store)
route.get('/', authMiddleware, complaintController.index)
route.put('/:complaintId', authMiddleware, complaintController.solve)

export default route
