/**
* Name: suppliers.controller
*
* @author Pedro Ruiz Hidalgo
*		  correo@pedroruizhidalgo.es
*         @pedroruizhidalg
*
*		  Coding the world since 1983!
*
* Location: server/controllers/suppliers.controller
*
* Created:  26 Aug 2018
*
*
* Description: controller for suppliers
*
* Requirements: '../database.js'
*
*/
const { connPromise } = require('../database');

const Ok = {
    status: "200",
    response: "Ok"
};

const TABLE = "suppliers_suppliers";

const suppliersController = {};

suppliersController.getSuppliers = async (req, res) => {
    
  await connPromise
    .then((conn) => conn.query(`SELECT * FROM ${TABLE}`) )
    .then(([rows, f, err]) => {
        res.json(!err ? rows : err);
    });
};

suppliersController.getSupplier = async (req, res) => {
    await connPromise
        .then((conn) => conn.query(`SELECT * FROM ${TABLE} WHERE id=${req.params.id}`))
        .then(([rows, f, err]) => {
            res.json(!err ? rows[0] : err);
        });
};

suppliersController.deleteSupplier = async (req,res) => {
    await connPromise
        .then( (conn) => conn.query(`DELETE FROM ${TABLE} WHERE id = ${req.params.id}`) )
        .then( ([row, fields, err]) => 
            res.json( !err ? Ok : err)
        );
};

suppliersController.createSupplier = async (req, res) => {
    await connPromise
        .then ( (conn) => 
           conn.execute(
                `INSERT INTO ${TABLE} (type, tax_id, first_name, last_name) values (?,?,?,?)`,
                [
                    req.body.type,
                    req.body.tax_id,
                    req.body.first_name,
                    req.body.last_name
                ]
            )
        )
        .then( ([rows, fields, error]) => res.json( !error ? Ok : err))
        .catch ( e => res.json(e))
};

suppliersController.putSupplier = async (req, res) => {
    await connPromise
        .then(conn =>
            conn.execute(
                `UPDATE ${TABLE} SET type=?, tax_id=?, first_name=?, last_name=? WHERE id=${req.params.id}`,
                [
                req.body.type,
                req.body.tax_id,
                req.body.first_name,
                req.body.last_name
                ]
            )
        )
        .then( ([rows, fields, error]) => res.json(!error ? Ok : error))
        .catch( e => res.json(e)) 

};

module.exports = suppliersController;
/** this ends this file
* server/controllers/suppliers.controller
**/