import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { register } from './slices/authSlice';
import useAuth from './hooks/useAuth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {

  const dispatch = useDispatch();
  const userAuth = useAuth();

  console.log(userAuth);

  const { success } = useSelector((state) => state.authSlice);

  // const handleRegister = ()=>{
  //   dispatch(register('abc'));
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ userAuth ? (<Home />) : (<Navigate to='/login' />) } />
          <Route path='/login' element={ !userAuth ? (<Login />) : (<Navigate to='/' />) } />
          <Route path='/register' element={ !userAuth ? (<Register />) : (<Navigate to='/' />) } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
