import { serverHttp as server } from "./index.js";
import conn from './db/conn.js';
import './chat.js';
import './models/User.js';
import './models/Group.js';
import './models/Message.js';

server.listen(5000, 'localhost', ()=>{
    console.log('Server running on PORT 5000...')
})

conn.sync({ force: false });

