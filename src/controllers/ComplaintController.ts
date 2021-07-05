import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import ejs from 'ejs'
import { resolve } from 'path'

import ComplaintRepository from '../database/repository/ComplaintRepository'
import AppError from '../utils/AppError'
import sendMail from '../utils/sendMail'

interface ComplaintStore {
  latitude: string
  longitude: string
}

class ComplaintController {
  static async store(req: Request, res: Response) {
    const { latitude: latStr, longitude: longStr } = req.body as ComplaintStore

    if (!latStr || !longStr) {
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

    if (complaint) {
      complaint.occurrences += 1

      ComplaintController.sendAddedOccurrenceComplaintEmail({
        latitude,
        longitude,
        occurrences: complaint.occurrences,
      })

      complaintRepository.save(complaint)
      return res.json({ message: 'complaint added' })
    }

    const newComplaint = complaintRepository.create({
      latitude,
      longitude,
    })

    await complaintRepository.save(newComplaint)

    ComplaintController.sendNewComplaintEmail({ latitude, longitude })

    return res.status(201).json({ message: 'complaint created' })
  }

  static async sendNewComplaintEmail({ latitude, longitude }) {
    const html = await ejs.renderFile(
      resolve(__dirname, '..', 'views', 'emails', 'newComplaint.ejs'),
      {
        latitude,
        longitude,
      }
    )

    await sendMail({
      html,
      to: process.env.SMTP_TO,
      subject: 'Nova denuncia Lixo-Zero Iporá',
    })
  }

  static async sendAddedOccurrenceComplaintEmail({
    latitude,
    longitude,
    occurrences,
  }) {
    const html = await ejs.renderFile(
      resolve(__dirname, '..', 'views', 'emails', 'newOccurrenceComplaint.ejs'),
      {
        latitude,
        longitude,
        occurrences,
      }
    )

    await sendMail({
      html,
      to: process.env.SMTP_TO,
      subject: 'Nova ocorrência de denuncia Lixo-Zero Iporá',
    })
  }
}

export default ComplaintController
