import './Group.css';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
// import { messagesGroup } from '../../slices/groupSlice';
import { useState } from 'react';
import { BsChevronRight } from 'react-icons/bs'
import { createMsg, messagesGroup } from '../../slices/groupSlice';
import NewMessage from '../../components/NewMessage';

const Group = ()=>{

    const socket = io('http://localhost:5000');

    const dispatch = useDispatch();

    const { messages, group } = useSelector(state => state.groupSlice);

    const [newMessage, setNewMessage] = useState('');
    const [message, setMessage] = useState([]);
    const [error, setError] = useState(null);
    
    const { user } = useSelector(state => state.authSlice);
    const { id } = useParams(); 
    // text,
    // userName: user.name,
    // userNumber: user.number,
    // userNumber: user.number,
    // GroupId: group.id

    // useEffect(()=>{
    //     // dispatch(messagesGroup(id));
    // },[dispatch]);

    //{group: {…}, messagesGroup: Array(11)}

    socket.emit('startChat', {
        GroupId: group.id,
    })

    useEffect(()=>{
        setMessage([]);
        dispatch(messagesGroup(id));
    },[dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!newMessage.trim()) return;

        const newMsg = {
            GroupId: group.id,
            text: newMessage,
            userName: user.userName,
            userNumber: user.userNumber,
        }
        
        socket.emit('newMsg', newMsg);
        
        await dispatch(createMsg(newMsg, id));

        setNewMessage('');
    }
    
    socket.on('newMsg', (data)=>{
    
        setMessage([...message, data])
        
    })

    return(
        <div className="groupId">
            <div className="headGroup">
            {(user && user.userName === group.userName) ? (
                <h2>{group.name}</h2>
            ) : (
                <h2>{group.userName}</h2>
            )}
            </div>
            <div className="allMsgs">
                {(messages && messages.length > 0) && (
                    <>
                        {messages.map(msg => (
                            <NewMessage msg={msg} key={msg.id} />    
                        ))}

                    </>
                )}

                {(message && message.length > 0) && (
                    <>
                        {message.map(msg => (
                            <NewMessage msg={msg} key={msg.id} />    
                        ))}
                    </>
                )}

                {((messages && messages.length <= 0) &&(message && message.length <= 0)) && (
                    <p className='nomsg'>Sem mensagens para esse grupo...</p>
                )}
            </div>
            <form onSubmit={handleSubmit} className="formAddMsg">
                <label>
                    <input 
                        type="text"
                        placeholder='Digite uma mensagem'
                        value={newMessage || ''}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                </label>
                <button type="submit"><BsChevronRight /></button>
            </form>
        </div>
    )
}

export default Group;