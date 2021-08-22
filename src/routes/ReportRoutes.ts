import { Router } from 'express'
import ReportController from '../controllers/ReportController'
import authMiddleware from '../middleware/Auth'

const router = Router()

router.get('/', authMiddleware, new ReportController().index)

export default router
