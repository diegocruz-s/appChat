import { DataTypes } from 'sequelize';
import db from '../db/conn.js'
import User from './User.js';

const Group = db.define('Group', {
    name: { type: DataTypes.STRING, require: true, allowNull: false },
    userName: { type: DataTypes.STRING, require: true, allowNull: false },
    numberUserCreate: { type: DataTypes.INTEGER, require: true, allowNull: false },
    numberContact: { type: DataTypes.INTEGER, require: true, allowNull: false },
})

Group.belongsTo(User);
User.hasMany(Group);

export default Group;