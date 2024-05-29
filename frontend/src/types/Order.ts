import { User } from './User'
import { cartItem, shippingAddress } from './cartItem'

export type Order = {
  _id: string
  user: User
  orderItems: cartItem[]
  shippingAddress: shippingAddress
  paymentMethod: string
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt: string
  isDelivered: boolean
  deliveredAt: string
  createdAt: string
}
