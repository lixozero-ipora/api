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
  created_at: Date

  @Column({ type: 'timestamptz' })
  solved_at: Date

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
    this.created_at = new Date()
    this.solved_at = null
  }

  static validateDescription(description: string) {
    return description.replace(/<|>|\*|\(|\)/gi, '').trim()
  }

  static validateWhatsapp(whatsapp: string) {
    if (whatsapp.length < 8 && whatsapp.length > 15) {
      throw new AppError('whatsapp validation failed')
    }

    return whatsapp
  }
}

export default Citizen
