import express from 'express'
import { Request, Response } from 'express'
import { sampleProduct } from './data'
import cors from 'cors'

const app = express()

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProduct)
})

app.get('/api/products/:url', (req: Request, res: Response) => {
  res.json(sampleProduct.find((x) => x.url === req.params.url))
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
