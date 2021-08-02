import { Router } from 'express'
import ComplaintController from '../controllers/ComplaintController'
import authMiddleware from '../middleware/Auth'

const route = Router()

const complaintController = new ComplaintController()

route.post('/', complaintController.store)
route.get('/', authMiddleware, complaintController.index)

export default route
