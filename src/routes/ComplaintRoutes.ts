import { Router } from 'express'
import ComplaintController from '../controllers/ComplaintController'

const route = Router()

const complaintController = new ComplaintController()

route.post('/', complaintController.store)

export default route
