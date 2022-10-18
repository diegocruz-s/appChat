import { useState } from 'react';
import { useEffect } from 'react';
import './Message.css';

const Message = ({ msg, type })=>{

    const [showMsg, setShowMsg] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setShowMsg(false);
        }, 2000)
    }, [])

    return(
        <div className="message">
            {showMsg && (
                <p className={`pMsg ${type}`}>{msg}</p>
            )}
        </div>
    )
}

export default Message;