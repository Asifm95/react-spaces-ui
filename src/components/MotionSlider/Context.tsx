import React, { createContext, Dispatch, useReducer } from "react"

type IState = {
  items: number[]
  activeItem: number
  doneAnimation: boolean
}
type ActionType =
  | { type: "ADD_ITEM"; item: number }
  | { type: "SET_ACTIVE_ITEM"; activeItem: number }
  | { type: "SET_ANIMATION_STATE"; doneAnimation: boolean }

type ContextType = {
  state: IState
  dispatch: Dispatch<ActionType>
}

export const sliderContext = createContext({} as ContextType)

export const ContextProvider = ({ children }) => {
  const initialState = {
    items: [],
    activeItem: 0,
    doneAnimation: false,
  }

  function reducer(state: IState, action: ActionType) {
    switch (action.type) {
      case "ADD_ITEM":
        return {
          ...state,
          items: [...state.items, action.item],
        }
      case "SET_ACTIVE_ITEM":
        return {
          ...state,
          activeItem: action.activeItem,
        }
      case "SET_ANIMATION_STATE":
        return {
          ...state,
          doneAnimation: action.doneAnimation,
        }
      default:
        return initialState
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <sliderContext.Provider value={{ state, dispatch }}>
      {children}
    </sliderContext.Provider>
  )
}
