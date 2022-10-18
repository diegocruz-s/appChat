import { DataTypes } from 'sequelize';
import db from '../db/conn.js'

const User = db.define('User', {
    name: { type: DataTypes.STRING, require: true, allowNull: false },
    password: { type: DataTypes.STRING, require: true, allowNull: false },
    number: { type: DataTypes.INTEGER, require: true, allowNull: false, unique: true },
    image: { type: DataTypes.STRING },
})

export default User;

