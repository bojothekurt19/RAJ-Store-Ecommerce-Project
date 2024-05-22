import express, { Request, Response } from 'express'
import { sampleProduct, sampleUsers } from '../data'
import { ProductModel } from '../models/productModel'
import asyncHandler from 'express-async-handler'
import { UserModel } from '../models/userModel'

export const seedRouter = express.Router()
seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(sampleProduct)

    await UserModel.deleteMany({})
    const createdUsers = await UserModel.insertMany(sampleUsers)

    res.json({ createdProducts, createdUsers })
  })
)
