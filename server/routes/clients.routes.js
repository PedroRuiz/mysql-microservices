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
router.get('/addresses/:idclient', clientsController.getClientAddresses);
router.get('/address/:id', clientsController.getAddress);
router.get('/phones/:id', clientsController.getPhones);

router.post('/', clientsController.createClient);
router.post('/addresses/:idclient', clientsController.addAddress);
router.post('/phones/:idclient', clientsController.addPhones);

router.put('/:id', clientsController.putClient);
router.put('/addresses/:id', clientsController.putAddress);
router.put('/phones/:id', clientsController.putPhones);

router.delete('/:id', clientsController.deleteClient);
router.delete('/addresses/:id', clientsController.deleteAddress);
router.delete('/phones/:id', clientsController.deletePhones);

module.exports = router; 

/** this ends this file
* server/routes/clients.routes
**/