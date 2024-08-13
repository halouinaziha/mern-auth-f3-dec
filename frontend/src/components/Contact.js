import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteContact, getContact } from '../redux/actions/contactActions';
import { useDispatch } from "react-redux"
import { toggleTrue } from '../redux/actions/editActions';
import {Link} from "react-router-dom"

const Contact = ({ contact }) => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deleteContact(contact._id))
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="profilepic.jpg" />
      <Card.Body>
        <Card.Title>{contact.name}</Card.Title>
        <Card.Text>{contact.email}</Card.Text>
        <Card.Text>{contact.phone}</Card.Text>
        <Link to={`/edit/${contact._id}`}>
          <Button variant="success" onClick={() => {dispatch(getContact(contact._id)); dispatch(toggleTrue())}}>Edit</Button>
        </Link>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  )
}

export default Contact