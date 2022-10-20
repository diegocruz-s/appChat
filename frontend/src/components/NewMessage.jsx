import { useSelector } from 'react-redux';
import './NewMessage.css';

const NewMessage = ({ msg })=>{

    const { user } = useSelector(state => state.authSlice);

    return(
        <div key={msg.id} className={`msg ${msg.userNumber == user.userNumber ? 'msgUserLogged' : 'notUserLogged'}`}>
            <div className="contentMsg">
                <p className='userNameMsg'>{msg.userName}</p>
                <p className='textMsg'>{msg.text}</p>
            </div>                      
        </div>
    )
}

export default NewMessage;