import express from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel'

export const productRouter = express.Router()
productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find()
    res.json(products)
  })
)

productRouter.get(
  '/:url',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ url: req.params.url })
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product Not Found. ' })
    }
  })
)
// productRouter.post(
//   '/',
//   asyncHandler(async (req, res) => {
//     const newProduct = new ProductModel(req.body)
//     await newProduct.save()
//     res.status(201).json(newProduct)
//   })
// )
