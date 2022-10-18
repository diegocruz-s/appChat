import './Register.css';
import { BsCheckCircleFill, BsCheckCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { register, resetStates } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';

const Register = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(resetStates());
    }, []);

    const { error, loading } = useSelector((state) => state.authSlice);
 
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const newUser = {
            name, password, number
        }

        await dispatch(register(newUser));
    }

    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    return(
        <div className="register">
            <div className="divForm">
                <h1>Cadastrar</h1>
                <form onSubmit={handleSubmit} className="formGlobal formLogin">
                    <label className="labelGlobal">
                        <input 
                            className="inputGlobal"
                            type="text" 
                            placeholder='Nome'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </label>
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

                <p className='btnNavigationAuth'>Já tem conta? <Link to='/login'>Entrar</Link></p>

            </div>
        </div>
    )
}

export default Register;