import { GET_CONTACT, GET_CONTACTS_FAIL, GET_CONTACTS_LOAD, GET_CONTACTS_SUCCESS } from "../constants/actionTypes"

const initialState = {
  contacts: [],
  contact: {},
  loadContacts: false,
  errors: []
}

export const contactReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CONTACTS_LOAD:
      return { ...state, loadContacts: true }
    case GET_CONTACTS_SUCCESS:
      return { ...state, loadContacts: false, contacts: payload }
    case GET_CONTACTS_FAIL:
      return { ...state, loadContacts: false, errors: payload }
    case GET_CONTACT:
      return {...state, contact: payload}
    default:
      return state
  }
}