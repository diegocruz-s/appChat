import { io } from './index.js';

io.on('connection', (socket)=>{
    console.log(socket.id);
})