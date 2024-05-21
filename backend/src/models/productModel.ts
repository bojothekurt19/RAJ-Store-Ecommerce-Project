import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  public _id!: string

  @prop({ required: true })
  public name!: string

  @prop({ required: true, unique: true })
  public url!: string

  @prop({ required: true })
  public image!: string

  @prop({ required: true })
  public category!: string

  @prop({ required: true })
  public brand!: string

  @prop({ required: true })
  public description!: string

  @prop({ required: true, default: 0 })
  public price!: number

  @prop({ required: true, default: 0 })
  public stockCount!: number

  @prop({ required: true, default: 0 })
  public rating!: number

  @prop({ required: true, default: 0 })
  public numberOfReviews!: number
}

export const ProductModel = getModelForClass(Product)