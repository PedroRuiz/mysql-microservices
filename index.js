/**
* Name: index
*
* @author Pedro Ruiz Hidalgo
*		  correo@pedroruizhidalgo.es
*         @pedroruizhidalg
*
*		  Coding the world since 1983!
*
* Location: server/index
*
* Created:  24 Aug 2018
*
*
* Description:
*
* Requirements:
*
*/

const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const { connection } = require('./database');

connection.on('error', (err) => {
    console.log('error',err);
    process.exit(1);
});


/** this ends this file
* server/index
**/