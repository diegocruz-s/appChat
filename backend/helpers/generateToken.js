import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateToken = (user)=>{
    
    const token = jwt.sign({
        name: user.name,
        number: user.number,
    }, process.env.SECRET_TOKEN, {
        expiresIn: '7d'
    })

    return token;

}

export default generateToken;