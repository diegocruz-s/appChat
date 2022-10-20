import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import AuthRoutes from './routes/AuthRoutes.js';
import GroupRoutes from './routes/GroupRoutes.js'
import MessageRoutes from './routes/MessageRoutes.js'
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', AuthRoutes);
app.use('/group', GroupRoutes);
app.use('/messages', MessageRoutes);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

export { serverHttp, io };

