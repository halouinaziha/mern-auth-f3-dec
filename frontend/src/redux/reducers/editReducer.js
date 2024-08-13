import { TOGGLE_FALSE, TOGGLE_TRUE } from "../constants/actionTypes"

const initialState = {
  edit: false
}

export const editReducer = (state = initialState, { type }) => {
  switch (type) {
    case TOGGLE_TRUE:
      return { edit: true }
    case TOGGLE_FALSE:
      return { edit: false }
    default:
      return state
  }
}