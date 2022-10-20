import generateToken from '../helpers/generateToken.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const regNumber = /^[0-9]{8}$/;

const AuthController = {
    
    async register (req,res){

        const {name, password, number} = req.body;

        if(!name || !password || !number){
            return res.status(422).json({ error: 'Dados inválidos!' });
        }

        if(!regNumber.test(number)){
            return res.status(422).json({ error: 'Número incorreto!' });
        }

        try {
            const existsUser = await User.findOne({ where: { number } });

            if(existsUser){
                return res.status(422).json({ error: 'Usuário já existente!' });
            }

            const hashPassword = bcrypt.hashSync(password);
            
            const newUser = { name, number, password: hashPassword }

            const user = await User.create(newUser);

            const token = await generateToken(user);

            res.status(201).json({
                success: 'Usuário criado com sucesso',
                token,
                userName: user.name,
                userNumber: user.number,
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal error!' });
        }
        
    },

    async login (req,res){
        const { number, password } = req.body;

        if(!number || !password){
            return res.status(422).json({ error: 'Dados inválidos!' });
        }

        try {
            const user = await User.findOne({ where: { number } });

            if(!user){
                return res.status(404).json({ error: 'Autenticação inválida!' });
            }

            const checkPass = bcrypt.compareSync(password, user.password);

            if(!checkPass){
                return res.status(404).json({ error: 'Autenticação inválida!!' });
            }

            const token = await generateToken(user);

            res.status(201).json({
                success: 'Usuário criado com sucesso',
                token,
                userName: user.name,
                userNumber: user.number
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal error!' });
        }

    },

    async test (req,res){
        res.json({ message: 'Ok checkAuth!' });
    }

}

export default AuthController;