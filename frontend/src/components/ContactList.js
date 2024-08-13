import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getContacts } from '../redux/actions/contactActions';
import Contact from './Contact';

const ContactList = () => {
  const contacts = useSelector(state => state.contactReducer.contacts)
  const loadContacts = useSelector(state => state.contactReducer.loadContacts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getContacts())
  }, [])

  return (
    <div className='contactList'>
      {
        loadContacts
        ? <Spinner animation="border" variant="primary" />
        : contacts.length === 0
          ? <h2>No contacts found!</h2>
          : contacts.map(contact => <Contact contact={contact} key={contact._id} />)
      }
    </div>
  )
}

export default ContactList