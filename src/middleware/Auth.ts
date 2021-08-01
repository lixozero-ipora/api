import { NextFunction, Request, Response } from 'express'
import JWT from 'jsonwebtoken'
import AppError from '../utils/AppError'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  try {
    const token = authHeader.split(' ')[1]

    JWT.verify(token, process.env.SECRET)

    next()
  } catch (error) {
    throw new AppError('unauthorized', 403)
  }
}

export default authMiddleware
