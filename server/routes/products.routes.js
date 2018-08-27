/**
* Name: products.routes
*
* @author Pedro Ruiz Hidalgo
*		  correo@pedroruizhidalgo.es
*         @pedroruizhidalg
*
*		  Coding the world since 1983!
*
* Location: server/routes/products.routes
*
* Created:  25 Aug 2018
*
*
* Description: routes for products
*
* Requirements: express
*
*/

const express = require('express');
const router = express.Router();

const controller = require('../controllers/products.controller');

router.get('/p/', controller.getProducts);
router.get('/p/:id', controller.getProduct);
router.get('/p/code/:code', controller.getProductByCode);
router.get('/i/:id', controller.getImages);
router.get("/i/:idImage", controller.getImage);

router.post('/p/', controller.createProduct);
router.post("/i/:id", controller.createImage);

router.put('/p/:id', controller.putProduct);
router.put('/p/addstock/:id', controller.addStock);
router.put("/p/addtoserve/:id", controller.addToServe);
router.put('/p/addtoreceive/:id', controller.addToReceive);

router.delete('/p/:id', controller.deleteProduct);
router.delete("/i/:idImage", controller.deleteImage);

module.exports = router;

/** this ends this file
* server/routes/products.routes
**/