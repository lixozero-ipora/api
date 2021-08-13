import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import Citizen from './Citizen'

@Entity('complaint')
class Complaint {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  latitude: number

  @Column()
  longitude: number

  @Column()
  occurrences: number

  @Column(() => Citizen)
  active: Citizen[]

  @Column(() => Citizen)
  solved: Citizen[]

  @Column()
  has_active_complaints: boolean

  /**
   * Aparently non-string values dont work
   * in Column default value
   */
  @BeforeInsert()
  beforeInsertHook() {
    this.occurrences = 1
    this.solved = []
  }

  @CreateDateColumn({ type: 'datetime', default: () => '$currentDate' })
  created_at: Date

  @UpdateDateColumn({ type: 'datetime', default: () => '$currentDate' })
  updated_at: Date
}

export default Complaint
