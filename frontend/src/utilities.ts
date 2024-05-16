import { ApiError } from './types/ApiError'
import { CurrencyFormat } from './types/CurrencyFormat'
import { Product } from './types/Product'
import { cartItem } from './types/cartItem'

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}
// export const getError = (error: Error | ApiError) => {
//   if (
//     'response' in error &&
//     error.response &&
//     error.response.data &&
//     error.response.data.message
//   ) {
//     return error.response.data.message
//   } else {
//     return error.message
//   }
// }
export const productToCart = (product: Product): cartItem => {
  const cartProduct: cartItem = {
    _id: product._id,
    name: product.name,
    url: product.url,
    image: product.image,
    price: CurrencyFormat(product.price),
    stockCount: product.stockCount,
    quantity: 1,
  }
  return cartProduct
}
