import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import AppError from '../utils/AppError'

class SessionController {
  static async store(req: Request, res: Response) {
    const { user, password } = req.body

    if (user !== process.env.ADMIN_ROOT_USER) {
      throw new AppError('wrong user', 403)
    }
    if (!bcrypt.compareSync(password, process.env.ADMIN_ROOT_PASSWORD)) {
      throw new AppError('wrong password or email', 403)
    }

    const token = JWT.sign({ id: user }, process.env.SECRET, {
      expiresIn: '2h',
    })

    return res.json({ token })
  }
}

export default SessionController
