import ejs from 'ejs'
import { resolve } from 'path'
import nodemailer, { Transporter } from 'nodemailer'
import {
  NewComplaint,
  NewOccurrenceOfComplaint,
  SendMailProps,
} from '../@types'

export default class Mail {
  private transport: Transporter

  constructor(
    baseTransport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS,
      },
    })
  ) {
    this.transport = baseTransport
  }

  async sendMail({ text, html, to, subject }: SendMailProps) {
    const message = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html,
    }

    return this.transport.sendMail(message)
  }

  public async sendNewComplaintEmail({
    latitude,
    longitude,
    name,
    adress,
    whatsapp,
  }: NewComplaint) {
    const html = await ejs.renderFile(
      resolve(__dirname, '..', 'views', 'emails', 'newComplaint.ejs'),
      {
        latitude,
        longitude,
        name,
        adress,
        whatsapp,
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
      }
    )

    await this.sendMail({
      html,
      to: process.env.SMTP_TO,
      subject: 'Nova ocorrência de reclamação Lixo-Zero Iporá',
    })
  }
}
