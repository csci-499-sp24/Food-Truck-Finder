import * as dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

//Database Connection
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

const getUserInfo = async(info) => {
    try{
        const DBInfo = await itemsPool.query(
            'Select * from public."Users" where email = $1',
            [info.email]
        );
        return DBInfo.rows[0];
    }catch(error){
        return {};
    }
}

const closeConnection = async() => {
    await itemsPool.end();
}

export {checkLogin, checkSignup, closeConnection, getUserInfo};