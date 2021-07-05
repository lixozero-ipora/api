import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

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

  /**
   * Aparently non-string values dont work
   * in Column default value
   */
  @BeforeInsert()
  beforeInsertHook() {
    this.occurrences = 1
  }

  @CreateDateColumn({ type: 'datetime', default: () => '$currentDate' })
  created_at: Date

  @UpdateDateColumn({ type: 'datetime', default: () => '$currentDate' })
  updated_at: Date
}

export default Complaint
