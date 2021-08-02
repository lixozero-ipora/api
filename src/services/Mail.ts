import ejs from 'ejs'
import { resolve } from 'path'
import sgMail from '@sendgrid/mail'
import {
  NewComplaint,
  NewOccurrenceOfComplaint,
  SendMailProps,
} from '../@types'

export default class Mail {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async sendMail({ text, html, to, subject }: SendMailProps) {
    const message = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html,
    }

    return sgMail.send(message)
  }

  public async sendNewComplaintEmail({
    latitude,
    longitude,
    name,
    adress,
    whatsapp,
    description,
  }: NewComplaint) {
    const html = await ejs.renderFile(
      resolve(__dirname, '..', 'views', 'emails', 'newComplaint.ejs'),
      {
        latitude,
        longitude,
        name,
        adress,
        whatsapp,
        description,
      }
    )

    await this.sendMail({
      html,
      to: process.env.SMTP_TO,
      subject: 'Nova reclamação Lixo-Zero Iporá',
    })
  }

  public async sendAddedOccurrenceComplaintEmail({
    latitude,
    longitude,
    occurrences,
    name,
    adress,
    whatsapp,
    description,
  }: NewOccurrenceOfComplaint) {
    const html = await ejs.renderFile(
      resolve(__dirname, '..', 'views', 'emails', 'newOccurrenceComplaint.ejs'),
      {
        latitude,
        longitude,
        occurrences,
        name,
        adress,
        whatsapp,
        description,
      }
    )

    await this.sendMail({
      html,
      to: process.env.SMTP_TO,
      subject: 'Nova ocorrência de reclamação Lixo-Zero Iporá',
    })
  }
}
