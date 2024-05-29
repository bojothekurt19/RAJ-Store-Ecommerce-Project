import React from 'react'
import { Cart, cartItem, shippingAddress } from './types/cartItem'
import { UserInfo } from './types/UserInfo'

type AppState = {
  mode: string
  cart: Cart
  userInfo?: UserInfo
  user?: UserInfo
}
const initialState: AppState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,

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
  | { type: 'Remove_Item_From_Cart'; payload: cartItem }
  | { type: 'Cart_Clear' }
  | { type: 'User_Signin'; payload: UserInfo }
  | { type: 'User_Signout' }
  | { type: 'Save_Shipping_Address'; payload: shippingAddress }
  | { type: 'Save_Payment_Method'; payload: string }

function reducer(state: AppState, action: Action): AppState {
  let newMode
  switch (action.type) {
    case 'SWITCH_MODE':
      newMode = state.mode === 'dark' ? 'light' : 'dark'
      localStorage.setItem('mode', newMode) // Save the new mode to local storage
      return { ...state, mode: newMode }

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

    case 'Remove_Item_From_Cart': {
      const cartItems = state.cart.cartItems.filter(
        (item: cartItem) => item._id !== action.payload._id
      )
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }

    case 'Clear_Cart': {
      const cartItems: never[] = []
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case 'User_Signin':
      return {
        mode:
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
        cart: {
          cartItems: [],
          paymentMethod: 'Paypal',
          shippingAddress: {
            fullName: '',
            address: '',
            postalCode: '',
            city: '',
            country: '',
            location: {
              lat: 0,
              lng: 0,
            },
          },
          itemPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      }
    case 'Save_Shipping_Address':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      }
    case 'Save_Payment_Method':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      }
    case 'Cart_Clear':
      return {
        ...state,
        cart: { ...state.cart, cartItems: [] },
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
