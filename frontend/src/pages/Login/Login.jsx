import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetStates } from '../../slices/authSlice';
import { BsCheckCircleFill, BsCheckCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './Login.css';
import Message from '../../components/Message';
import { useEffect } from 'react';

const Login = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(resetStates());
    },[]);

    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');

    const { error, loading } = useSelector(state => state.authSlice);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = {
            number, password
        }

        await dispatch(login(user));

    }

    return(
        <div className="login">
            <div className="divForm">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="formGlobal formLogin">
                    <label className="labelGlobal">
                        <input 
                            className="inputGlobal"
                            type="number" 
                            placeholder='Número(xxxxxxxx)'
                            onChange={(e) => setNumber(e.target.value)}
                            value={number}
                            required
                        />
                        {number.length === 8 ? (
                            <BsCheckCircleFill />
                        ) : (
                            <BsCheckCircle />
                        )}
                    </label>
                    <label className="labelGlobal">
                        <input 
                            className="inputGlobal"
                            type="password" 
                            placeholder='Senha'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        {password.length >= 6 ? (
                            <BsCheckCircleFill />
                        ) : (
                            <BsCheckCircle />
                        )}
                    </label>

                    { error && <Message msg={error} type='error' />}

                    { loading ? (
                        <input type="submit" className="submitForm" value="Aguarde..." disabled />
                    ) : (
                        <input type="submit" className="submitForm" value="Cadastrar" />
                    ) }

                </form>

                <p className='btnNavigationAuth'>Não tem conta? <Link to='/register'>Cadastrar-se</Link></p>

            </div>

        </div>
    )
}

export default Login;