import nodemailer from 'nodemailer'

interface SendMailProps {
  text?: string
  html: string
  to: string
  subject: string
}

const sendMail = async ({ text, html, to, subject }: SendMailProps) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_AUTH_PASS,
    },
  })

  const message = {
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
    html,
  }

  return transport.sendMail(message)
}

export default sendMail
