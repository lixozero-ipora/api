export interface ComplaintStore {
  name: string
  neighborhood: string
  adress: string
  whatsapp: string
  description: string
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
  description: string
}

export interface NewOccurrenceOfComplaint extends NewComplaint {
  occurrences: number
}

export interface ScheduleToUpdate {
  id: string
  neighborhood: string
  start: string
  end: string
}
