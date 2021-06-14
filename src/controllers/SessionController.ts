import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../database/repository/UserRepository'
import AppError from '../utils/AppError'

class SessionController {
  static async store(req: Request, res: Response) {
    const { email, password } = req.body

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({ where: { email } })

    if (!bcrypt.compareSync(password, user.password)) {
      throw new AppError('wrong password or email', 403)
    }

    const token = JWT.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: '2h',
    })

    return res.json({ token })
  }
}

export default SessionController
