import { Column, Entity } from 'typeorm'

@Entity()
class Citizen {
  @Column()
  adress: string

  @Column()
  name: string

  @Column()
  whatsapp: string

  constructor(name: string, adress: string, whatsapp: string) {
    this.name = name
    this.adress = adress
    this.whatsapp = whatsapp
  }
}

export default Citizen
