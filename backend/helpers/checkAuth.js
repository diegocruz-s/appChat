import jwt from 'jsonwebtoken';
import 'dotenv/config';

const checkAuth = async (req,res, next) => {
    try {
        const headAuth = req.headers.authorization;
        if(!headAuth){
            return res.status(422).json({ error: 'Acesso negado!' });
        }

        const token = headAuth.split(' ')[1];

        if(!token){
            return res.status(422).json({ error: 'Acesso negado!!' });
        }

        const verifyToken = await jwt.verify(token, process.env.SECRET_TOKEN);

        if(!verifyToken){
            return res.status(422).json({ error: 'Token inválido!' });
        }

        next();

    } catch (error) {
        return res.status(422).json({ error: 'Token inválido!!' });
    }
    
}

export default checkAuth;