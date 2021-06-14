import express from 'express'
import dotenv from 'dotenv'
import 'reflect-metadata'
import 'express-async-errors'

import UserRoutes from './routes/UserRoutes'
import SessionRoutes from './routes/SessionRoutes'
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
  }

  routes() {
    this.server.use(UserRoutes)
    this.server.use(SessionRoutes)
  }

  errorMiddleware() {
    this.server.use(ErrorMiddleware)
  }
}

export default new App().server
