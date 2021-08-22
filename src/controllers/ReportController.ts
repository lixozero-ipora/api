import { Request, Response } from 'express'
import xlsx from 'node-xlsx'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import { getCustomRepository } from 'typeorm'
import ComplaintRepository from '../database/repository/ComplaintRepository'
import Citizen from '../database/models/Citizen'

class ReportController {
  public async index(_req: Request, res: Response) {
    const complaintsRepository = getCustomRepository(ComplaintRepository)

    const complaints = await complaintsRepository.find({
      order: {
        has_active_complaints: 'DESC',
      },
    })

    const formatedComplaints = complaints.reduce(
      (acc, complaint) => ({
        active: [...complaint.active, ...acc.active],
        solved: [...complaint.solved, ...acc.solved],
      }),
      { active: [] as Citizen[], solved: [] as Citizen[] }
    )

    const data = [
      [
        'Bairro',
        'Endereço',
        'Nome',
        'Whatsapp',
        'Criação da ocorrência',
        'Resolução da ocorrência',
      ],
      ...formatedComplaints.active.map((citizen) => [
        citizen.neighborhood,
        citizen.adress,
        citizen.name,
        citizen.whatsapp,
        new Date(citizen.created_at).toLocaleDateString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        'Não resolvido',
      ]),
      ...formatedComplaints.solved.map((citizen) => [
        citizen.neighborhood,
        citizen.adress,
        citizen.name,
        citizen.whatsapp,
        new Date(citizen.created_at).toLocaleDateString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        new Date(citizen.solved_at).toLocaleDateString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      ]),
    ]

    const buffer = xlsx.build(
      [
        {
          name: `Relatório dia ${new Date()
            .toLocaleDateString('pt-BR')
            .replace(/[/?*[\]]/g, '-')}`,
          data,
        },
      ],
      {
        '!cols': [
          { wch: 20 },
          { wch: 30 },
          { wch: 15 },
          { wch: 15 },
          { wch: 17 },
          { wch: 20 },
        ],
      }
    ) as any

    const relatoryFile = resolve(__dirname, 'report.xlsx')

    await writeFile(relatoryFile, buffer)

    res.download(relatoryFile)
  }
}

export default ReportController
