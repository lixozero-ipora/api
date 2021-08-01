import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ScheduleToUpdate } from '../@types'
import ScheduleRepository from '../database/repository/ScheduleRepository'

class ScheduleController {
  async index(_, res: Response) {
    const scheduleRepository = getCustomRepository(ScheduleRepository)

    const schedules = await scheduleRepository.find()

    return res.json(schedules)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const scheduleRepository = getCustomRepository(ScheduleRepository)

    const schedule = await scheduleRepository.findOne(id)

    return res.json(schedule)
  }

  async update(req: Request, res: Response) {
    const schedules = req.body.schedules as ScheduleToUpdate[]
    const scheduleRepository = getCustomRepository(ScheduleRepository)

    const updatedSchedules = await Promise.all(
      schedules.map(async (schedule) => {
        const scheduleToUpdate = await scheduleRepository.findOne(schedule.id)

        scheduleToUpdate.start = schedule.start
        scheduleToUpdate.end = schedule.end

        return scheduleRepository.save(scheduleToUpdate)
      })
    )

    return res.json(updatedSchedules)
  }
}

export default ScheduleController
