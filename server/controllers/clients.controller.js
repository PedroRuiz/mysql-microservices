/**
* Name: clients.controller
*
* @author Pedro Ruiz Hidalgo
*		  correo@pedroruizhidalgo.es
*         @pedroruizhidalg
*
*		  Coding the world since 1983!
*
* Location: server/controllers/clients.controller
*
* Created:  24 Aug 2018
*
*
* Description: controller for clients
*
* Requirements: mysql2, '../database.js', '../models/clients'
*
*/

const mysql = require('mysql2');

const Client  = require('../models/client');

const { connection } = require('../database');

const Error = {
    'package': 'izanagi',
    'controller': 'clients',
    'error': ''
};

const Ok = {
    'status': '200',
    'response': 'Ok'
};

const clientsController = {};

clientsController.getclients = (req, res) => {

    connection.query(
      "SELECT * FROM custom_customers",
      (err, result, fields) => {
        if (!err) {
          res.json(result);
        } else {
          res.json(err);
        }
      }
    );

};

clientsController.getClient = (req, res) => {
    id = req.params.id

    connection.query(
        `SELECT * FROM custom_customers WHERE id = ${id}`,
        (err, result) => {
            if (!err) 
            {
                res.json(result[0]);
            }
            else 
            {
                res.json(err);
            }
        }
    )
};

clientsController.createClient = async (req, res) => {
    data = req.body;
    
    arrData = [
        data.first_name,
        data.last_name,
        data.tax_id_number,
        data.mobile,
        data.work_phone,
        data.home_phone,
        data.fax,
        data.pager,
        data.image
    ];

    connection.execute(
        `SELECT INTO  custom_customers 
            (first_name,last_name,tax_id_number,mobile,work_phone,home_phone,fax,pager,image) 
            VALUES (?,?,?,?,?,?,?,?,?)`, 
        arrData,
        (err, result, fields) => {
            if (!err){
                res.json(Ok);
                console.log(fields);
            } 
            else 
            {
                res.json(err);
            }
        }
    )
};

clientsController.putClient = async (req,res) => {
    id = req.params.id;

    data = req.body;

    arrData = [
        data.first_name, 
        data.last_name, 
        data.tax_id_number, 
        data.mobile, 
        data.work_phone, 
        data.home_phone, 
        data.fax, 
        data.pager, 
        data.image
    ];

    query = `UPDATE custom_customers 
            SET first_name = ?, last_name = ?, tax_id_number= ?,
            mobile = ?, work_phone = ?, home_phone = ?,
            fax = ?, pager = ?, image = ? 
            WHERE id = ${id}`;
    
    connection.execute(
        query, arrData,
        (err) => {
            if (!err) {
                res.json(Ok);
            }
            else {
                res.json(err);
            }
        }
    
    )
}

clientsController.deleteClient = async (req,res) => {
    id = req.params.id;

    query="DELETE FROM custom_customers WHERE id = ?";

    connection.execute(
        query,[id],
        (err) => {
            if (!err) {
                res.json(Ok);
            }
            else {
                res.json(err);
            }
        }
    )
};

module.exports = clientsController;
/** this ends this file
* server/controllers/clients.controller
**/