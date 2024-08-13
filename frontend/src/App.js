import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from "./components/Home"
import ContactList from "./components/ContactList"
import AddEdit from "./components/AddEdit"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAuthUser } from './redux/actions/authActions';

function App() {
  const isAuth = useSelector(state => state.authReducer.isAuth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAuthUser())
  }, [])

  return (
    <div>
      <AppNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-list" element={isAuth ? <ContactList /> : <Navigate to="/" />} />
        <Route path="/add" element={isAuth ? <AddEdit /> : <Navigate to="/" />} />
        <Route path="/edit/:id" element={isAuth ? <AddEdit /> : <Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
