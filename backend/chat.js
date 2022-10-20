import { io } from './index.js';

io.on('connection', (socket)=>{

    socket.on('startChat', async (data) => {
        socket.join(data.GroupId);
    });

    socket.on('newMsg', async (data)=>{

        io.to(data.GroupId).emit('newMsg', data);

    });

});

