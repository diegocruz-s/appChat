import getToken from "../helpers/getToken.js";
import getUserByToken from "../helpers/getUserByToken.js";
import Group from "../models/Group.js";
import Message from "../models/Message.js";

const MessageControler = {

    async create (req,res){
        try {
            const { id } = req.params;
            const { text } = req.body;

            if(!text){
                return res.status(422).json({ error: 'Adicione uma mensagem!' })
            }

            const token = await getToken(req);
            const user = await getUserByToken(token, res);

            if(!user){
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }

            const group = await Group.findOne({ where: { id } });

            if(!group || (group.numberUserCreate !== user.number && group.numberContact !== user.number)){
                return res.status(404).json({ error: 'Não pode enviar mensagem para esse grupo!' });
            }

            const newMessage = {
                text,
                userName: user.name,
                userNumber: user.number,
                userNumber: user.number,
                GroupId: group.id
            }

            const message = await Message.create(newMessage);

            return res.status(201).json(
                message
            );
        
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal error!' });
        }

    },

    async allMessagesGroup (req,res){
        try {
            const { id } = req.params;
            const token = await getToken(req);
            const user = await getUserByToken(token, res);

            const group = await Group.findOne({ where: { id } });

            if(!group || (group.numberUserCreate !== user.number && group.numberContact !== user.number)){
                return res.status(404).json({ error: 'Não pode ver mensagens deste grupo!' });
            }

            const messagesGroup = await Message.findAll({ where: { GroupId: id } });

            return res.json({group, messagesGroup});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal error!' })
        }
    }

}

export default MessageControler;