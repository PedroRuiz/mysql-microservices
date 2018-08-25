/**
* Name: clients.routes
*
* @author Pedro Ruiz Hidalgo
*		  correo@pedroruizhidalgo.es
*         @pedroruizhidalg
*
*		  Coding the world since 1983!
*
* Location: server/routes/clients.routes
*
* Created:  24 Aug 2018
*
*
* Description: routers for clients
*
* Requirements: express
*
*/

const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients.controller');

router.get('/', clientsController.getclients);
router.get('/:id', clientsController.getClient);

router.post('/', clientsController.createClient);

router.put('/:id', clientsController.putClient);

router.delete('/:id', clientsController.deleteClient);

module.exports = router; 

/** this ends this file
* server/routes/clients.routes
**/