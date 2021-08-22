import { getCustomRepository } from 'typeorm'
import ScheduleRepository from '../database/repository/ScheduleRepository'
import connection from '../database/connection'
import iporaNeighborhoods from './iporaNeighborhoods.json'

const run = async () => {
  await connection()
  const scheduleRepository = getCustomRepository(ScheduleRepository)

  await scheduleRepository.insert(
    iporaNeighborhoods.map((neighborhood) => ({
      neighborhood,
      start: '',
      end: '',
    }))
  )

  process.exit(0)
}

run()
