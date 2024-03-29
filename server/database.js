const dotenv = require('dotenv');
dotenv.config();

//Database Connection
const { Pool } = require('pg'); 
const itemsPool = new Pool({
    connectionString: process.env.DBConfigLink,
    ssl: {
        rejectUnauthorized: false
    }
});

//Check User Identifications
const checkLogin = async(info) => {
    try {
        const DBInfo = await itemsPool.query(
            'Select * from public."Users" where email = $1',
            [info.email]
        )
        if(DBInfo.rowCount == 0) return false;
        const UserInfo = DBInfo.rows[0];
        if(info.email.toLowerCase() != UserInfo.email.toLowerCase() || info.password != UserInfo.password) return false;
        else return true;
    } catch(error){
        console.log(error);
        return false;
    }
}

const checkSignup = async(info) => {
    try {
        const DBInfo = await itemsPool.query(
            'Select * from public."Users" where email = $1',
            [info.email]
        )
        if(DBInfo.rowCount != 0) return false;
        else return true;
    } catch(error){
        return false;
    }
}


export {checkLogin, checkSignup};