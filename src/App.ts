import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import SessionRoutes from './routes/SessionRoutes'
import ComplaintRoutes from './routes/ComplaintRoutes'
import ScheduleRoutes from './routes/ScheduleRoutes'
import ErrorMiddleware from './middleware/Error'
import connection from './database/connection'

connection()

class App {
  server = express()

  constructor() {
    dotenv.config()
    this.middlewares()
    this.routes()
    this.errorMiddleware()
  }

  middlewares() {
    this.server.use(express.json())
    this.server.use(cors('*'))
  }

  routes() {
    this.server.use('/session', SessionRoutes)
    this.server.use('/complaints', ComplaintRoutes)
    this.server.use('/schedules', ScheduleRoutes)
  }

  errorMiddleware() {
    this.server.use(ErrorMiddleware)
  }
}

export default new App().server
