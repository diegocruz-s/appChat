import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/User.js';

const getUserByToken = async (token, res)=>{
    try {
        const checkToken = await jwt.verify(token, process.env.SECRET_TOKEN);

        if(!checkToken){
            return res.status(422).json({ error: 'Token inválido!' });
        }

        const user = await User.findOne({ raw: true, where: { number: checkToken.number }});
        
        delete user.password;

        return user;

    } catch (error) {
        console.log(error);
        return res.status(404).json({ error: 'Usuário não encontrado!' });
    }
} 

export default getUserByToken;