import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { register } from './slices/authSlice';
import useAuth from './hooks/useAuth';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Group from './pages/Group/Group';
import { BsArrowLeft } from 'react-icons/bs';

function App() {

  const dispatch = useDispatch();
  const userAuth = useAuth();

  const { success } = useSelector((state) => state.authSlice);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ userAuth ? (<Home />) : (<Navigate to='/login' />) } />
          <Route path='/login' element={ !userAuth ? (<Login />) : (<Navigate to='/' />) } />
          <Route path='/register' element={ !userAuth ? (<Register />) : (<Navigate to='/' />) } />
          <Route path='/group/:id' element={ userAuth ? (<Group />) : (<Navigate to='/login' />) } />
        </Routes>

        <div className="goHomeDiv">
          <Link to='/'>
              <button className='btnFixed goHome'><BsArrowLeft /></button>
          </Link>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
