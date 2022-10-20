import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { createGroup, deleteGroup, getGroupsUser, resetStatesGroup } from '../../slices/groupSlice';
import { Link } from 'react-router-dom';
import { BsBoxArrowInRight, BsFillTrashFill } from 'react-icons/bs';
import './Home.css';
import Message from '../../components/Message';
import { useRef } from 'react';

const Home = () => {

    const dispatch = useDispatch();
    const { groups, loading: loadingGroups, error, success } = useSelector(state => state.groupSlice);
    const { user } = useSelector(state => state.authSlice);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [nameGroup, setNameGroup] = useState('');
    const [numberGroup, setNumberGroup] = useState('');
    const btn = useRef();

    useEffect(()=>{
        dispatch(getGroupsUser()); 
    }, [dispatch])

    const handleLogout = ()=>{
        dispatch(logout());
    }

    if(loadingGroups){
        return (
            <p className='loadingHome'>Carregando...</p>
        )
    }

    const showForm = () => {
        if(btn.current.textContent === '+'){
            setShowFormCreate(true)
            btn.current.textContent = '-'
        }else {
            setShowFormCreate(false)
            btn.current.textContent = '+'
        }
    }

    const handleCreateGroup = async (e) => {
        e.preventDefault();

        if(!nameGroup.trim() || !numberGroup.trim()) return;

        const newGroup = {
            name: nameGroup,
            numberContact: numberGroup
        }
        
        dispatch(createGroup(newGroup));

        setShowFormCreate(false)
        btn.current.textContent = '+'
        setNameGroup('');
        setNumberGroup('');

    }

    const handleDelete = async (id) => {
        dispatch(deleteGroup(id));
    }

    return(
        <div className="home">
            <div className="headHome">
                <h1>Seus contatos</h1>
                <button ref={btn} onClick={showForm} className='btnNewGroup'>+</button>
            </div>

            {showFormCreate && (
                <div className="divFormCreate">
                    <form onSubmit={handleCreateGroup} className="newGroup">
                        <label>
                            <input 
                                type="text"
                                placeholder='Nome'
                                value={nameGroup || ''}
                                onChange={(e) => setNameGroup(e.target.value)}
                            />
                        </label>
                        <label>
                            <input 
                                type="number"
                                placeholder='Número(xxxxxxxx)'
                                value={numberGroup || ''}
                                onChange={(e) => setNumberGroup(e.target.value)}
                            />
                        </label>
                        <input type="submit" value='Criar' />
                    </form>
                </div>
                
            )}


            {error && (
                <Message msg={error} type='error' />
            )}

            {success && (
                <Message msg={success} type='success' />
            )}

            <div className="groups">
                {( groups && groups.length > 0 ) ? (
                    <>
                        {groups.map(group => (
                            <div className="group"  key={group.id}>
                                <Link to={`group/${group.id}`} className="datasGroup">
                                    {(user && user.userName === group.userName) ? (
                                        <p className='groupName'>{group.name}</p>
                                    ) : (
                                        <p className='groupName'>{group.userName}</p>
                                    )}

                                    {(user && user.userNumber === group.numberUserCreate) ? (
                                        <p className='numberContact'>{group.numberContact}</p>
                                    ) : (
                                        <p className='numberContact'>{group.numberUserCreate}</p>
                                    )}
                                </Link>
                                <BsFillTrashFill onClick={() => handleDelete(group.id)} className='svgDelete' />
                            </div>           
                        ))}  
                    </>                      
                ) : (
                    <p className='nomsg'>Você não tem nenhum contato...</p>
                )}
            </div>

            <div className="logoutDiv">
                <button className='btnFixed logoutBtn' onClick={handleLogout}><BsBoxArrowInRight /></button>
            </div>

            
        </div>
    )

}

export default Home;
