import React from 'react'
import { Cart, cartItem } from './types/cartItem'

type AppState = {
  mode: string
  cart: Cart
}
const initialState: AppState = {
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems')!)
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress')!)
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod')!)
      : 'Paypal',
    itemPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
}

type Action =
  | { type: 'SWITCH_MODE' }
  | { type: 'Add_To_Cart'; payload: cartItem }
  | { type: 'Clear_Cart' }
function reducer(state: AppState, action: Action): AppState {
  let newMode
  switch (action.type) {
    case 'SWITCH_MODE':
      newMode = state.mode === 'dark' ? 'light' : 'dark'
      localStorage.setItem('mode', newMode) // Save the new mode to local storage
      return { ...state, mode: newMode }

    //   case 'Add_To_Cart':
    //     const newItem = action.payload
    //     const existingItem = state.cart.cartItems.find(
    //       (item:cartItem) => item._id === newItem._id
    //     )
    //     const cartItems = existingItem
    //     ? state.cart.cartItems.map((item: cartItem)=>
    //     item._id === existingItem._id ? newItem : item )
    //     : [...state.cart.cartItems, newItem]
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems))
    //     return { ...state, cart: { ...state.cart, cartItems } }
    //      default:
    //     return state
    //   }
    // }
    case 'Add_To_Cart': {
      const newItem = action.payload
      const existingItem = state.cart.cartItems.find(
        (item: cartItem) => item._id === newItem._id
      )

      const cartItems = existingItem
        ? state.cart.cartItems.map((item: cartItem) =>
            item._id === existingItem._id ? { ...item, ...newItem } : item
          )
        : [...state.cart.cartItems, newItem]
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    default:
      return state
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

function ColorTheme(props: React.PropsWithChildren) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )
  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, ColorTheme }
