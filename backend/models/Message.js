import { DataTypes } from 'sequelize';
import db from '../db/conn.js'
import Group from './Group.js';

const Message = db.define('Message', {
    text: { type: DataTypes.STRING, allowNull: false, require: true },
    userName: { type: DataTypes.STRING, allowNull: false, require: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, require: true },
});

Message.belongsTo(Group);
Group.hasMany(Message);

export default Message;