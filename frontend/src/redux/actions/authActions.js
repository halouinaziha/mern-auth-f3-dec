import axios from "axios"
import { toast } from 'react-toastify';
import { GET_AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../constants/actionTypes";

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light"
  }

//register user
export const registerUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/register", formData)
    if (res) {
      toast.success(res.data.msg, toastOptions)
    }
    // dispatch({type: REGISTER_USER, payload: res.data})
  } catch (error) {
    console.log(error);
    const {errors, msg} = error.response.data
    if (errors) {
      errors.forEach(err => toast.error(err.msg, toastOptions))
    } else {
      toast.error(msg, toastOptions)
    }
  }
}

//login user
export const loginUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/login", formData)
    if (res) {
      toast.success(res.data.msg, toastOptions)
    }
    dispatch({type: LOGIN_USER, payload: res.data})
  } catch (error) {
    console.log(error);
    const {errors, msg} = error.response.data
    if (errors) {
      errors.forEach(err => toast.error(err.msg, toastOptions))
    } else {
      toast.error(msg, toastOptions)
    }
  }
}

//logout user
export const logoutUser = () => (dispatch) => {
  dispatch({type: LOGOUT_USER})
  toast.success("User logged out", toastOptions)
}

// get auth user
export const getAuthUser = () => async (dispatch) => {
  try {
    //headers
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem("token")
      }
    }
    const res = await axios.get('/api/auth/user', config)
    dispatch({
      type: GET_AUTH_USER,
      payload: res.data
    })
  } catch (error) {
    console.log(error)
  }
}