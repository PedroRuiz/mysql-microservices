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

var nodeMaria = require('node-mariadb');

//hs readable configuration.
var connection = nodeMaria.createConnection({
    driverType: nodeMaria.DRIVER_TYPE_HANDLER_SOCKET,
    host: 'localhost',
    port: 9998
});


connection.on('erorr', function (err) {
    console.log(err);
    process.exit(1);
});


connection.on('connect', () => {
    connection.openIndex('CTU', 'employee', nodeMaria.HandlerSocket.PRIMARY, ['id', 'name', 'age']
        , function (err, hs) {
            hs.find([1], { limit: 1 }, function (err, data) {
                console.log(data);   //=> [{ id: '1', name: 'jack', age: '40' }]
            });
        });
});

/** this ends this file
* server/database
**/
