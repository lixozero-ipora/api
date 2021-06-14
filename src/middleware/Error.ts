import { Request, Response } from 'express'
import AppError from '../utils/AppError'

// eslint-disable-next-line no-unused-vars
function ErrorMiddleware(error, req: Request, res: Response, _) {
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message })
  }

  return res.status(500).json({ message: 'an error occurred in the server' })
}

export default ErrorMiddleware
