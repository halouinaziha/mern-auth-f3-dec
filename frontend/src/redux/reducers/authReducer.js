import { GET_AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../constants/actionTypes"

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuth: false
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case REGISTER_USER:
    case LOGIN_USER:
      localStorage.setItem("token", payload.token)
      return { ...state, isAuth: true, ...payload }
    case LOGOUT_USER:
      localStorage.removeItem("token")
      return { isAuth: false, user: null, token: null }
    case GET_AUTH_USER:
      return { ...state, isAuth: true, ...payload }
    default:
      return state
  }
}

export default authReducer