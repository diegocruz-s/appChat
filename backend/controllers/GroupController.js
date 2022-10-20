import getToken from "../helpers/getToken.js";
import getUserByToken from "../helpers/getUserByToken.js";
import Group from "../models/Group.js";
import User from "../models/User.js";
import { Op } from 'sequelize'
import Message from "../models/Message.js";

const GroupController = {

    async create (req,res){
        try {
            const { name, numberContact } = req.body;

            if(!name || !numberContact){
                return res.status(404).json({ error: 'Dados inválidos!' });
            }

            const checkNumberContact = await User.findOne({ where: { number: numberContact } });

            if(!checkNumberContact){
                return res.status(422).json({ error: 'Usuário não encontrado!!' });
            }

            const token = await getToken(req);
            const user = await getUserByToken(token, res);

            if(!user){
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }

            if(numberContact === user.number){
                return res.status(422).json({ error: 'Você não pode criar um grupo com você mesmo!' });
            }

            const newGroup = {
                name, numberContact, numberUserCreate: user.number, UserId: user.id
            }

            const group = await Group.create(newGroup);

            return res.status(200).json({ success: 'Grupo criado!', group });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal erorr!' });
        }
    },

    async allGroupsUser (req,res){
        const token = await getToken(req);
        const user = await getUserByToken(token, res);

        if(!user){
            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }

        const groups = await Group.findAll({ 
            where: { 
                [Op.or]: [
                    { numberUserCreate: user.number }, 
                    { numberContact: user.number }
                ]
            },
        })

        res.status(200).json(
            groups
        );

    },

    async delete (req,res){
        try {
            const { id } = req.params;

            const token = await getToken(req);
            const user = await getUserByToken(token, res);

            if(!user){
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }

            const group = await Group.findOne({ where: { id } });

            if(!group){
                return res.status(404).json({ error: 'Grupo não encontrado!' });
            }

            if(user.number !== group.numberUserCreate && user.number !== group.numberContact){
                return res.status(422).json({ error: 'Você não pode excluir este grupo!' });
            }

            await group.destroy();

            return res.status(200).json({ message: 'Grupo excluído com sucesso!' });

        } catch (error) {
            
        }

    },

}

export default GroupController;