export type cartItem = {
  image: string | undefined
  name: string
  url: string
  quantity: number
  stockCount: number
  _id: string
  price: number
}

export type shippingAddress = {
  address: string
  city: string
  postalCode: string
  country: string
  fullName: string
  location: Location
}
type Location = {
  lat: number
  lng: number
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
