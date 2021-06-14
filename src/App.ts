import express from 'express'

class App {
  server = express()

  constructor() {
    this.middlewares()
  }

  middlewares() {
    this.server.use(express.json())
  }
}

export default new App().server
