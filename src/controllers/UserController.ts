import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../database/repository/UserRepository'
import AppError from '../utils/AppError'

class UserController {
  static async store(req: Request, res: Response) {
    const {
      email,
      password,
      social_name,
      description,
      city,
      cep,
      phone_number,
    } = req.body

    if (
      !email ||
      !password ||
      !social_name ||
      !description ||
      !city ||
      !cep ||
      !phone_number
    ) {
      throw new AppError('missing arguments')
    }

    const userRepository = getCustomRepository(UserRepository)

    const user = userRepository.create({
      email,
      password: bcrypt.hashSync(password, 10),
      social_name,
      description,
      city,
      cep,
      phone_number,
    })

    await userRepository.save(user)

    return res.status(201).json(user)
  }
}

export default UserController
