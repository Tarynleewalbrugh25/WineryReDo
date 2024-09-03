import{createPool} from 'mysql'; //this is mysql make sure to always import it 
 import{config} from 'dotenv';
 config()
 let Connection = createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_Name,
    user: process.env.DB_UserName,
    password: process.env.DB_UserPass,
    multipleStatements: true,
    connectionLimit: 30
 })   
 export {
    Connection
 } 