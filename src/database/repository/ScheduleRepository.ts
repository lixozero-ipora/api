import { EntityRepository, Repository } from 'typeorm'
import Schedule from '../models/Schedule.entity'

@EntityRepository(Schedule)
class ScheduleRepository extends Repository<Schedule> {}

export default ScheduleRepository
