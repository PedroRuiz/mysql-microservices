/**
* Name: suppliers.routes
*
* @author Pedro Ruiz Hidalgo
*		  correo@pedroruizhidalgo.es
*         @pedroruizhidalg
*
*		  Coding the world since 1983!
*
* Location: server/routes/suppliers.routes
*
* Created:  26 Aug 2018
*
*
* Description: routes for suppliers
*
* Requirements: express, '../controllers/suppliers.controller.js'
*
*/

const express = require("express");
const router = express.Router();

const controller = require('../controllers/suppliers.controller');

router.get("/s/", controller.getSuppliers);
router.get("/s/:id", controller.getSupplier);
router.get('/p/:id', controller.getSupplierPhones);
router.get("/p/id/:id", controller.getSupplierPhoneById);
router.get("/b/:id", controller.getSupplierBanks);
router.get('/a/:id', controller.getSupplierAddresses);

router.post('/s', controller.createSupplier);
router.post("/p/:id", controller.createSupplierPhones);
router.post('/b/:id', controller.createSupplierBank);
router.post('/a/:id', controller.createSupplierAddress);

router.delete('/s/:id', controller.deleteSupplier);
router.delete("/p/:id", controller.deleteSupplierPhone);
router.delete('/b/:id', controller.deleteSupplierBank);
router.delete("/a/:id", controller.deleteSupplierAddress);

router.put('/s/:id', controller.putSupplier);
router.put('/p/:id', controller.putSupplierPhone);
router.put('/b/:id', controller.putSupplierBank);
router.put('/a/:id', controller.putSupplierAddress);

module.exports = router;
/** this ends this file
* server/routes/suppliers.routes
**/