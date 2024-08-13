import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editContact, postContact } from '../redux/actions/contactActions';

const AddEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contact, setContact] = useState({name: "", email: "", phone: ""})
  console.log(contact);

  const contactFromReducer = useSelector(state => state.contactReducer.contact)
  // console.log(contactFromReducer);

  const edit = useSelector(state => state.editReducer.edit)

  useEffect(() => {
    edit ? setContact(contactFromReducer) : setContact({name: "", email: "", phone: ""})
  }, [edit, contactFromReducer])

  const handleChange = (e) => {
    setContact({...contact, [e.target.name]: e.target.value})
  }

  const handleContact = (e) => {
    e.preventDefault()
    if (!edit) {
      dispatch(postContact(contact, navigate))
    } else {
      dispatch(editContact(contact._id, contact, navigate))
    }
  }
  return (
    <Form onSubmit={handleContact}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={handleChange} name='name' value={contact.name} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleChange} name='email' value={contact.email} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="Enter phone number" onChange={handleChange} name='phone' value={contact.phone} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {edit ? "Save" : "Add"}
      </Button>
    </Form>
  )
}

export default AddEdit