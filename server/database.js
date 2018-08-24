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

const { DATABASE, HOST, PASSWORD, USER } = require( '../connData.js' );

const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});

module.exports = {
    connection: connection
}

/** this ends this file
* server/database
**/
