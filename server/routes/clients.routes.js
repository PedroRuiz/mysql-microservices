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
router.get('/pag/:limit/:offset', clientsController.getPaginatedClients);
router.get('/:id', clientsController.getClient);
router.get('/addresses/:idclient', clientsController.getClientAddresses);
router.get('/address/:id', clientsController.getAddress);
router.get('/phones/:id', clientsController.getPhones);
router.get("/phones/id/:id", clientsController.getPhonesById);
router.get('/banks/:idclient', clientsController.getBankAccounts);
router.get('/emails/:id', clientsController.getEmails);
router.get('/emails/id/:id', clientsController.getEmailById);

router.post('/', clientsController.createClient);
router.post('/addresses/:idclient', clientsController.addAddress);
router.post('/phones/:idclient', clientsController.addPhones);
router.post('/banks/:idclient', clientsController.addBankAccount);
router.post('/emails/:idclient', clientsController.addEmail);

router.put('/:id', clientsController.putClient);
router.put('/addresses/:id', clientsController.putAddress);
router.put('/phones/:id', clientsController.putPhones);
router.put('/banks/:id', clientsController.putBankAccounts);
router.put('/emails/:id', clientsController.putEmail);

router.delete('/:id', clientsController.deleteClient);
router.delete('/addresses/:id', clientsController.deleteAddress);
router.delete('/phones/:id', clientsController.deletePhones);
router.delete('/banks/:id', clientsController.deleteBankAccounts);
router.delete('/emails/:id', clientsController.deleteEmail);

module.exports = router;

/** this ends this file
* server/routes/clients.routes
**/
