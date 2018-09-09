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
const { connData } = require('../connData');

const URL_version = '/api/v1';


/**
 * S E T I N G S
 */
app.set('port', process.env.PORT || 3000);


/**
 * M I D D L E W A R E S
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));

/**
 * R O U T E S
 */
app.use(`${URL_version}/clients`, require('./routes/clients.routes'));
app.use(`${URL_version}/products`, require('./routes/products.routes'));
app.use(`${URL_version}/suppliers`, require('./routes/suppliers.routes'));

app.use('*', (req, res) => {
  res.json({
    'status': '404',
    'response': 'Not found'
  })
});

/**
 * S T A R T I N G   S E R V E R
 */
app.listen(app.get('port'), (error) => {
    if (error) {
        console.log('\nError on server: ', err);
    }
    else {
        console.log('\nServer on port', app.get('port'));
        if (connection) {
            console.log('Mysql connected to host',connData.HOST);
        }
    }
});

/** this ends this file
* server/index
**/
