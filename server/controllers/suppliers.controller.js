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
const PHONES = 'suppliers_phones';

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

suppliersController.getSupplierPhones = async (req, res) => {
    await connPromise
        .then(
            (conn) => conn.query(`SELECT * FROM ${PHONES} WHERE id_supplier = ${req.params.id}`)
        )
        .then( ([rows, fielsd, error]) => res.json( !error ? rows : error))
        .catch( e => res.json(e))
};

suppliersController.createSupplierPhones = async (req, res) => {
    await connPromise
        .then( (conn) => 
            conn.execute(`INSERT INTO ${PHONES} (id_supplier, default_phone, prefix, number, suffix, memo) VALUES (?,?,?,?,?,?) `,
            [
                req.params.id,
                req.body.default_phone,
                req.body.prefix,
                req.body.number,
                req.body.suffix,
                req.body.memo
            ]
        )
        .then( ([rows, fields, error]) => res.json( !error ? Ok : error))
        .catch( e => res.json(e))
    )
};

suppliersController.putSupplierPhone = async (req, res) => {
    await connPromise
        .then( (conn) => 
            conn.execute(`UPDATE ${PHONES} SET default_phone = ?, prefix = ?, number=?, suffix=?, memo = ? WHERE id=${req.params.id}`,
            [
                req.body.default_phone,
                req.body.prefix,
                req.body.number,
                req.body.suffix,
                req.body.memo
            ]
        )
    )
    .then( ([rows, fields, err]) => res.json(!err ? Ok : err) )
    .catch( e => res.json(e))
};

suppliersController.deleteSupplierPhone = async (req, res) => {
    await connPromise
        .then( (conn) => 
            conn.query(`DELETE FROM ${PHONES} WHERE id = ${req.params.id}`)
        )
        .then ( ([rows, fields, err]) => res.json( !err ? Ok : err) )
        .catch( e => res.json(e))
}

suppliersController.getSupplierPhoneById = async (req, res) => {
    await connPromise
        .then( 
            conn => conn.query(`SELECT * FROM ${PHONES} WHERE id = ${req.params.id}`)
        )
        .then( ([rows, fields, err]) => 
            res.json (!err ? rows[0] : err)
        )
        .catch( e => res.json(e))
};

module.exports = suppliersController;
/** this ends this file
* server/controllers/suppliers.controller
**/