import express, { Request, Response } from 'express'
import { sampleProduct } from '../data'
import { ProductModel } from '../models/productModel'
import asyncHandler from 'express-async-handler'

export const seedRouter = express.Router()
seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(sampleProduct)
    res.json({ createdProducts })
  })
)
