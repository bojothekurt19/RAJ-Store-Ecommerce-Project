import React from 'react'

type AppState = {
  mode: string
}
const initialState: AppState = {
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
}

type Action = { type: 'SWITCH_MODE' }
function reducer(state: AppState, action: Action): AppState {
  let newMode
  switch (action.type) {
    case 'SWITCH_MODE':
      newMode = state.mode === 'dark' ? 'light' : 'dark'
      localStorage.setItem('mode', newMode) // Save the new mode to local storage
      return { ...state, mode: newMode }
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
