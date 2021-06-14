import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  social_name: string

  @Column('text')
  description: string

  @Column()
  city: string

  @Column()
  cep: string

  @Column()
  phone_number: string

  @Column({ default: false })
  is_deactivated: boolean

  @Column({ default: new Date().toISOString() })
  created_at: Date
}

export default User
