import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import './Home.css';

const Home = () => {

    const dispatch = useDispatch();

    const handleLogout = ()=>{
        dispatch(logout());
    }

    return(
        <div className="home">
            <h1>Home</h1>
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default Home;