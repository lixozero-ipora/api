import http from 'http'

setInterval(() => {
  try {
    http.get(process.env.KEPP_ALIVE)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Tryied requisition but did not work')
  }
}, 900000)
