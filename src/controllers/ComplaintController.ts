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
      description: descriptionRaw,
    } = req.body as ComplaintStore

    const description = Citizen.validateDescription(descriptionRaw)

    if (!latStr || !longStr || !name || !adress || !whatsapp || !description) {
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

    const newCitizen = new Citizen(
      name,
      adress,
      Citizen.validateWhatsapp(whatsapp),
      description
    )

    const mailService = new Mail()

    if (complaint) {
      complaint.occurrences += 1

      complaint.active.push(newCitizen)

      await mailService.sendAddedOccurrenceComplaintEmail({
        latitude,
        longitude,
        occurrences: complaint.occurrences,
        name,
        adress,
        whatsapp,
        description,
      })

      complaintRepository.save(complaint)
      return res.json({ message: 'complaint added' })
    }

    const newComplaint = new Complaint()

    newComplaint.latitude = latitude
    newComplaint.longitude = longitude
    newComplaint.active = [newCitizen]
    newComplaint.has_active_complaints = true

    await complaintRepository.save(newComplaint)

    await mailService.sendNewComplaintEmail({
      latitude,
      longitude,
      name,
      adress,
      whatsapp,
      description,
    })

    return res.status(201).json({ message: 'complaint created' })
  }

  async index(_req: Request, res: Response) {
    const complaintRepository = getCustomRepository(ComplaintRepository)

    const complaints = await complaintRepository.find()

    res.json(complaints)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const complaintRepository = getCustomRepository(ComplaintRepository)

    const complaint = await complaintRepository.findOne(id)

    res.json(complaint)
  }

  async solve(req: Request, res: Response) {
    const { complaintId } = req.params
    const { solvedIndex: solvedIndexRaw, whatsapp } = req.body

    const solvedIndex = parseInt(solvedIndexRaw, 10)

    const complaintRepository = getCustomRepository(ComplaintRepository)

    const complaint = await complaintRepository.findOne(complaintId)

    if (!complaint) {
      throw new AppError('complaint not found', 400)
    }

    const solvedCitizen = complaint.active.slice(
      solvedIndex,
      solvedIndex + 1
    )[0]
    solvedCitizen.solved_at = new Date()

    /**
     * Whatsapp mismatch, incorrect index for this active complaint
     */
    if (solvedCitizen.whatsapp !== whatsapp) {
      throw new AppError('whatsapp and index mismatch')
    }

    complaint.active.splice(solvedIndex, 1)
    complaint.solved.push(solvedCitizen)

    if (!complaint.active.length) {
      complaint.has_active_complaints = false
    }

    await complaintRepository.save(complaint)

    return res.json(complaint)
  }

  async unsolve(req: Request, res: Response) {
    const { complaintId } = req.params
    const { solvedIndex: solvedIndexRaw, whatsapp } = req.body

    const solvedIndex = parseInt(solvedIndexRaw, 10)

    const complaintRepository = getCustomRepository(ComplaintRepository)

    const complaint = await complaintRepository.findOne(complaintId)

    if (!complaint) {
      throw new AppError('complaint not found', 400)
    }

    const solvedCitizen = complaint.solved.slice(
      solvedIndex,
      solvedIndex + 1
    )[0]
    solvedCitizen.solved_at = null

    /**
     * Whatsapp mismatch, incorrect index for this active complaint
     */
    if (solvedCitizen.whatsapp !== whatsapp) {
      throw new AppError('whatsapp and index mismatch')
    }

    complaint.solved.splice(solvedIndex, 1)
    complaint.active.push(solvedCitizen)
    complaint.has_active_complaints = true

    await complaintRepository.save(complaint)

    return res.json(complaint)
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
