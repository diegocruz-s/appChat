import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { getGroupsUser } from '../../slices/groupSlice';
import { Link } from 'react-router-dom';
import { BsBoxArrowInRight } from 'react-icons/bs';
import './Home.css';

const Home = () => {

    const dispatch = useDispatch();
    const { groups, loading: loadingGroups } = useSelector(state => state.groupSlice);
    const { user } = useSelector(state => state.authSlice);

    useEffect(()=>{
        dispatch(getGroupsUser()); 
    }, [dispatch])

    const handleLogout = ()=>{
        dispatch(logout());
    }

    if(loadingGroups){
        return (
            <p>Carregando...</p>
        )
    }

    console.log(groups)

    return(
        <div className="home">
            <div className="headHome">
                <h1>Seus contatos</h1>
                {/* criar grupo */}
            </div>

            <div className="groups">
                {( groups && groups.length > 0 ) ? (
                    <>
                        {groups.map(group => (
                            <div className="group"  key={group.id}>
                                <Link to={`group/${group.id}`} className="datasGroup">
                                    <p className='groupName'>{group.name}</p>
                                    {(user && user.number === group.numberUserCreate) ? (
                                        <p className='numberContact'>{group.numberUserCreate}</p>
                                    ) : (
                                        <p className='numberContact'>{group.numberContact}</p>
                                    )}
                                    
                                </Link>
                            </div>
                        ))}  
                    </>                      
                ) : (
                    <p>Você não tem nenhum contato...</p>
                )}
            </div>

            <div className="logoutDiv">
                <button className='logoutBtn' onClick={handleLogout}><BsBoxArrowInRight /></button>
            </div>
        </div>
    )

}

export default Home;
