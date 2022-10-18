import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import AuthRoutes from './routes/AuthRoutes.js';
import GroupRoutes from './routes/GroupRoutes.js'
import MessageRoutes from './routes/MessageRoutes.js'

const app = express();
const serverHttp = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/auth', AuthRoutes);
app.use('/group', GroupRoutes);
app.use('/messages', MessageRoutes);

const io = new Server(serverHttp);

export { io, serverHttp }

