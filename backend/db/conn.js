import { Sequelize } from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize(process.env.NAME_DB, process.env.ROOT_DB, process.env.PASS_DB, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

try{
    sequelize.authenticate();
    console.log('DB loaded!')
}catch(error){
    console.log(error)
}

export default sequelize;