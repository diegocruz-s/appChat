import { io } from './index.js';
import Group from './models/Group.js';
import Message from './models/Message.js';

io.on('connection', (socket)=>{

    socket.on('startChat', async (data) => {
        socket.join(data.GroupId);
        console.log('id', data.GroupId)
    });

    socket.on('newMsg', async (data)=>{

        io.to(data.GroupId).emit('newMsg', data)

        // try {

        //     if(!data.text){
        //         const newError = { error: 'Adicione uma mensagem!' }
        //         return newError
        //     }

        //     if(!user){
        //         const newError = { error: 'Usuário não encontrado!' }
        //         return newError
        //     }

        //     const group = await Group.findOne({ where: { id: data.GroupId } });

        //     if(!group || (group.numberUserCreate !== user.number && group.numberContact !== user.number)){
        //         const newError = { error: 'Não pode enviar mensagem para esse grupo!' }
        //         return newError
        //     }

        //     const newMessage = {
        //         text,
        //         userName: user.name,
        //         userNumber: user.number,
        //         userNumber: user.number,
        //         GroupId: group.id
        //     }

        //     const message = await Message.create(newMessage);

        //     return cb({
        //         success: 'Mensagem enviada!',
        //         message
        //     });
        
        // } catch (error) {
        //     console.log(error);
        //     const newError = { error: 'Internal error!' }
        //     return newError;
        // }
    })

});

