export interface ComplaintStore {
  name: string
  adress: string
  whatsapp: string
  latitude: string
  longitude: string
}

export interface SendMailProps {
  text?: string
  html: string
  to: string
  subject: string
}

export interface NewComplaint {
  latitude: number
  longitude: number
  name: string
  adress: string
  whatsapp: string
}

export interface NewOccurrenceOfComplaint extends NewComplaint {
  occurrences: number
}
