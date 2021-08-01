import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'schedules' })
class Schedule {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  neighborhood: string

  @Column()
  start: string

  @Column()
  end: string

  @CreateDateColumn({ type: 'datetime', default: () => '$currentDate' })
  created_at: Date

  @UpdateDateColumn({ type: 'datetime', default: () => '$currentDate' })
  updated_at: Date
}

export default Schedule
