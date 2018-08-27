/**
* Name: products.controller
*
* @author Pedro Ruiz Hidalgo
*		  correo@pedroruizhidalgo.es
*         @pedroruizhidalg
*
*		  Coding the world since 1983!
*
* Location: server/controllers/products.controller
*
* Created:  25 Aug 2018
*
*
* Description: controller for Products
*
* Requirements: '../database.js'
*
*/

const { connection } = require('../database');

const Ok = {
  status: "200",
  response: "Ok"
};

const TABLE = 'products_products';
const IMAGES = 'products_images';
const u_fields_insert = 'code, description, size, size_units, color, weight, weight_units, price, stock, broken_stock, on_sale, to_serve, to_receive';
const u_fields_update = 'code=?, description=?, size=?, size_units=?, color=?, weight=?, weight_units=?, price=?, stock=?, broken_stock=?, on_sale=?, to_serve=?, to_receive=?'; 
const i_fields_insert = 'product_id, image';

const productsController = {};

/**
 * P R O D U C T S
 */

productsController.getProducts = (req, res) => {
    connection.query(`SELECT * FROM ${TABLE}`,
        (err, result) => {
            res.json( (!err) ? result : err );
        }
    );
};

productsController.createProduct = (req, res) => {
    query = 
    `INSERT INTO ${TABLE} (${u_fields_insert}) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    connection.execute(
        query, [
        req.body.code,
        req.body.description,
        req.body.size,
        req.body.size_units,
        req.body.color,
        req.body.weight,
        req.body.weight_units,
        req.body.price,
        req.body.stock,
        req.body.broken_stock,
        req.body.on_sale,
        req.body.to_serve,
        req.body.to_receive
        ],
        (err) => {
            res.json((!err) ? Ok : err);
        }
    );
};

productsController.getProduct = (req, res) => {
    connection.query(`SELECT * FROM ${TABLE} WHERE id = ${req.params.id}`,
        (err, result) => {
            res.json((!err) ? result[0] : err);
        }
    );
}

productsController.getProductByCode = (req, res) => {
   connection.query(
    `SELECT * FROM ${TABLE} WHERE code = '${req.params.code}'`,
    (err, result) => {
      res.json(!err ? result[0] : err);
    }
  );
};

productsController.putProduct = (req,res) => {
    query = `UPDATE ${TABLE} SET ${u_fields_update} WHERE id=${req.params.id}`;

    connection.execute(
        query,
        [
            req.body.code,
            req.body.description,
            req.body.size,
            req.body.size_units,
            req.body.color,
            req.body.weight,
            req.body.weight_units,
            req.body.price,
            req.body.stock,
            req.body.broken_stock,
            req.body.on_sale,
            req.body.to_serve,
            req.body.to_receive
        ],
        err => {
            res.json( !err ? Ok : err );
        }
    );
};

productsController.deleteProduct = (req,res) => {
    connection.query(
        `DELETE FROM ${TABLE} WHERE id=${req.params.id}`,
        err => {
            res.json( !err ? Ok :err );
        }
    );
};

productsController.addStock = (req, res) => {
    id=req.params.id;

    connection.execute(
        `UPDATE ${TABLE} set stock = stock + ? where id = ${req.params.id}`, 
        [req.body.stock],
        (err) => {
            res.json( !err ? Ok : err );
        }
    );
};

productsController.addToServe = (req, res) => {
    id = req.params.id;

    connection.execute(
        `UPDATE ${TABLE} set to_serve = to_serve + ? where id = ${req.params.id}`,
        [req.body.to_serve],
        (err) => {
            res.json(!err ? Ok : err);
        }
    );
};

productsController.addToReceive = (req, res) => {
  id = req.params.id;

  connection.execute(
    `UPDATE ${TABLE} set to_receive = to_receive + ? where id = ${req.params.id}`,
    [req.body.to_receive],
    err => {
      res.json(!err ? Ok : err);
    }
  );
};

/**
 * I M A G E S
 */

productsController.getImages = (req, res) => {
    
    connection.query(
        `SELECT * FROM ${IMAGES} WHERE product_id = ${req.params.product_id}`,
        (err, result) => {
            res.json( !err ? result : err);
        }
    );
};

productsController.createImage = (req, res) => {
    
    id=req.params.id; // idproduct
    
    connection.execute(
        `INSERT INTO ${IMAGES} (${i_fields_insert}) VALUES (?,?)`,
        [
            req.body.product_id,
            req.body.image
        ],
        (e) => res.json( !e ? Ok : err )
    );
};

productsController.getImage = (req, res) => {
    query = `SELECT * FROM ${IMAGES} WHERE id = ${req.params.idImage}`;

    connection.query(
        query,
        (err, result)  => res.json( !err ? result : err )
    );
};

productsController.deleteImage = (req, res) => {
    connection.query(
        `DELETE FROM ${IMAGES} WHERE id = ${req.params.idImage}`,
        err => res.json ( !err ? Ok : err )
    );
};

module.exports = productsController;
/** this ends this file
* server/controllers/products.controller
**/