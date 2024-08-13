import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { logoutUser } from '../redux/actions/authActions';
import { toggleFalse } from '../redux/actions/editActions';
import Login from './Login';
import Register from './Register';

const AppNavBar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.authReducer.isAuth)

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">MERN APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">
              <Button variant="primary">Home</Button>
            </Link>
            {
              isAuth
                ? <>
                  <Link to="/contact-list">
                    <Button variant="primary">Contact List</Button>
                  </Link>
                  <Link to="/add">
                    <Button variant="primary" onClick={() => { dispatch(toggleFalse()) }}>Add Contact</Button>
                  </Link>
                </>
                : <></>
            }
          </Nav>
        </Navbar.Collapse>
        {
          isAuth
            ? <Button variant="primary" onClick={logout}>Logout</Button>
            : <>
              <Login />
              <Register />
            </>
        }
      </Container>
    </Navbar>
  )
}

export default AppNavBar