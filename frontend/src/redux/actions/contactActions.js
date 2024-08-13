import { GET_CONTACT, GET_CONTACTS_FAIL, GET_CONTACTS_LOAD, GET_CONTACTS_SUCCESS } from "../constants/actionTypes"
import axios from "axios"

export const getContacts = () => async (dispatch) => {
  dispatch({ type: GET_CONTACTS_LOAD })
  try {
    let result = await axios.get("/api/contact/getAllContacts")
    // console.log(result);
    dispatch({ type: GET_CONTACTS_SUCCESS, payload: result.data.response })
  } catch (error) {
    dispatch({ type: GET_CONTACTS_FAIL, payload: error })
    console.log(error);
  }
}

export const postContact = (contact, navigate) => async (dispatch) => {
  try {
    await axios.post("/api/contact/newContact", contact)
    console.log("Contact added");
    dispatch(getContacts())
    navigate("/contact-list")
  } catch (error) {
    console.log(error);
  }
}

export const deleteContact = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/contact/deleteOneContact/${id}`)
    dispatch(getContacts())
  } catch (error) {
    console.log(error);
  }
}

export const getContact = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/api/contact/getOneContact/${id}`)
    // console.log(result.data.response);
    dispatch({ type: GET_CONTACT, payload: result.data.response })
  } catch (error) {
    console.log(error);
  }
}

export const editContact = (id, contact, navigate) => async (dispatch) => {
  try {
    await axios.put(`/api/contact/updateOneContact/${id}`, contact)
    dispatch(getContacts())
    navigate("/contact-list")
  } catch (error) {
    console.log(error);
  }
}