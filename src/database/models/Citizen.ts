import { Column, CreateDateColumn, Entity } from 'typeorm'
import AppError from '../../utils/AppError'

@Entity()
class Citizen {
  @Column()
  adress: string

  @Column()
  name: string

  @Column()
  whatsapp: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: string

  constructor(
    name: string,
    adress: string,
    whatsapp: string,
    description: string
  ) {
    this.name = name
    this.adress = adress
    this.whatsapp = whatsapp
    this.description = description
    this.created_at = new Date().toISOString()
  }

  static validateDescription(description: string) {
    return description.replace(/<|>|\*|\(|\)/gi, '').trim()
  }

  static validateWhatsapp(whatsapp: string) {
    if (whatsapp.length !== 11) {
      throw new AppError('whatsapp validation failed')
    }

    return whatsapp
  }
}

export default Citizen
