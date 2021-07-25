import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import ejs from 'ejs'
import { resolve } from 'path'

import ComplaintRepository from '../database/repository/ComplaintRepository'
import AppError from '../utils/AppError'
import Citizen from '../database/models/Citizen'
import { ComplaintStore } from '../@types'
import Mail from '../services/Mail'
import Complaint from '../database/models/Complaint.entity'

class ComplaintController {
  async store(req: Request, res: Response) {
    const {
      latitude: latStr,
      longitude: longStr,
      name,
      adress,
      whatsapp,
    } = req.body as ComplaintStore

    if (!latStr || !longStr || !name || !adress || !whatsapp) {
      throw new AppError('missing params', 403)
    }
    const latitude = parseFloat(latStr)
    const longitude = parseFloat(longStr)

    const complaintRepository = getCustomRepository(ComplaintRepository)

    const complaint = await complaintRepository.findOne({
      where: {
        latitude: { $gt: latitude - 0.00015, $lt: latitude + 0.00015 },
        longitude: { $gt: longitude - 0.00015, $lt: longitude + 0.00015 },
      },
    })

    const newCitizen = new Citizen(name, adress, whatsapp)

    const mailService = new Mail()

    if (complaint) {
      complaint.occurrences += 1

      complaint.citizens.push(newCitizen)

      await mailService.sendAddedOccurrenceComplaintEmail({
        latitude,
        longitude,
        occurrences: complaint.occurrences,
        name,
        adress,
        whatsapp,
      })

      complaintRepository.save(complaint)
      return res.json({ message: 'complaint added' })
    }

    const newComplaint = new Complaint()

    newComplaint.latitude = latitude
    newComplaint.longitude = longitude
    newComplaint.citizens = [newCitizen]

    await complaintRepository.save(newComplaint)

    await mailService.sendNewComplaintEmail({
      latitude,
      longitude,
      name,
      adress,
      whatsapp,
    })

    return res.status(201).json({ message: 'complaint created' })
  }

  async test(_, res: Response) {
    const html = await ejs.renderFile(
      resolve(__dirname, '..', 'views', 'emails', 'newComplaint.ejs'),
      {
        latitude: -16.4417981,
        longitude: -51.1191188,
        occurrences: 2,
        name: 'Joao',
        adress: 'Rua dos bobos',
        whatsapp: '123123',
      }
    )

    return res.send(html)
  }
}

export default ComplaintController
