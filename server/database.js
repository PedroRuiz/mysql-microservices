/**
* Name: database
*
* @author Pedro Ruiz Hidalgo
*		  correo@pedroruizhidalgo.es
*         @pedroruizhidalg
*
*		  Coding the world since 1983!
*
* Location: server/database
*
* Created:  24 Aug 2018
*
*
* Description:
*
* Requirements:
*
*/

const mysql = require('mysql2');
const Promises = require('mysql2/promise');

const { connData } = require( '../connData.js' );

const connection = mysql.createConnection({
    host: connData.HOST,
    user: connData.USER,
    password: connData.PASSWORD,
    database: connData.DATABASE
});

const connPromise = Promises.createConnection({
    host: connData.HOST,
    user: connData.USER,
    password: connData.PASSWORD,
    database: connData.DATABASE
});

module.exports = {
    connection: connection,
    connPromise: connPromise
}

/** this ends this file
* server/database
**/
