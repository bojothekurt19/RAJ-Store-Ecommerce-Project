import express from 'express'

export const keyRouter = express.Router()

keyRouter.get('/paypal', (req, res) => {
  res.send({
    clientId:
      process.env.PAYPAL_CLIENT_ID ||
      'AQzCXu7up7UVkEu_txDFrviScUK_brpdfRR5JAT9Ube0peaee-4Xurb0HH-ExpYLsdusRhI2fv3sqIsE',
  })
})
