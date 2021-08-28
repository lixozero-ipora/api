import https from 'https'

setInterval(() => {
  try {
    // eslint-disable-next-line no-console
    console.log(`Keep alive to: ${process.env.KEPP_ALIVE}`)
    https.get(process.env.KEPP_ALIVE)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}, 900000)
