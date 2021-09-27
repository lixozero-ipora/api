import bcrypt from 'bcrypt'
import { config } from 'dotenv'

config()

export default function genPassword(str: string) {
  const salt = bcrypt.genSaltSync(12)
  const passwordHash = bcrypt.hashSync(str, salt)
  return passwordHash
}
