export type cartItem = {
  image: string | undefined
  name: string
  url: string
  quantity: number
  stockCount: number
  _id: string
}

export type shippingAddress = {
  address: string
  city: string
  postalCode: string
  country: string
  fullName: string
}

export type Cart = {
  cartItems: cartItem[]
  shippingAddress: shippingAddress
  paymentMethod: string
  itemPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
}
