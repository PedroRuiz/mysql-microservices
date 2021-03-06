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

clientsController.getPaginatedClients = (req, res) => {
  limit = req.params.limit;
  offset = req.params.offset;
  offset--;
    connection.query(
        `SELECT * FROM custom_customers LIMIT ${limit} OFFSET ${offset}`,
        (err, result, fields) => {
          return res.json ( !err ? result : err)
        }
    );
}

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
        `INSERT INTO custom_customers
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

clientsController.getClientAddresses = async (req,res) => {
    id = req.params.idclient;

    query = `SELECT * FROM custom_addresses WHERE id_custom = ${id}`;
    connection.query(
        query,
        (err, result) => {
            res.json( !err ? result : err);
        }
    );
};

clientsController.getAddress = async (req, res) => {
    id = req.params.id;

    query = "SELECT * from custom_addresses where id = ?";
    connection.execute(
        query,[id],
        (err, result) => {
            if (!err) {
                res.json(result[0]);
            }
            else {
                res.json(err);
            }
        }
    )
};

clientsController.addAddress = async (req, res) => {
    id = req.params.idclient;

    data = req.body;

    query = `INSERT INTO
            custom_addresses (id_custom, invoice_address, address_1, address_2, city, province, zip)
            VALUES (${id}, '${data.invoice_address}','${data.address_1}','${data.address_2}','${data.city}','${data.province}','${data.zip}')`;
    connection.query(
        query,
        (err) => {
            if (!err) {
                res.json(Ok);
            } else {
                res.json(err);
            }
        }
    )
};

clientsController.deleteAddress = async (req, res) => {
    id = req.params.id;

    connection.query(`delete from custom_addresses where id=${id}`,
        (err) => {
            if (!err) {
                res.json(Ok);
            }
            else {
                res.json(err);
            }
        }
    );
};

clientsController.putAddress = async (req, res) => {
    id = req.params.id;

   data = req.body;

   arrData = [
    data.address_1,
    data.address_2,
    data.city,
    data.province,
    data.zip
   ];

    query = `UPDATE custom_addresses set address_1=?, address_2=?, city=?, province=?, zip=? WHERE id=${id}`;

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
    );
};

clientsController.getPhones = async (req, res) => {
    id = req.params.id;

    query = `SELECT * FROM custom_phones WHERE id_custom=${id}`;

    connection.query(
        query, (err, result) => {
            if (! err ) {
                res.json(result);
            } else {
                res.json(err);
            }
        }
    );
};

clientsController.addPhones = async (req, res) => {
    id = req.params.idclient;

    query = `INSERT INTO custom_phones (id_custom, phone_type, prefix, phone, suffix, memo)
        VALUES (${id},?,?,?,?,?);`;

    connection.execute(
        query, [
            req.body.phone_type,
            req.body.prefix,
            req.body.phone,
            req.body.suffix,
            req.body.memo
        ], (err) => {
            if (!err) {
                res.json(Ok);
            } else {
                res.json(err);
            }
        }
    );
};

clientsController.putPhones = async (req, res) => {
    id = req.params.id;

    query = `UPDATE custom_phones SET phone_type = ?, prefix = ?, phone = ?, suffix = ?, memo = ?
        WHERE id = ${id}`;

    connection.execute(
        query, [
            req.body.phone_type,
            req.body.prefix,
            req.body.phone,
            req.body.suffix,
            req.body.memo
        ], (err) => {
            if ( ! err ) {
                res.json(Ok);
            } else {
                res.json(err);
            }
        }
    );
};

clientsController.deletePhones = async (req, res) => {
    id = req.params.id;

    connection.query(`DELETE FROM custom_phones WHERE id = ${id}`,
        (err) => {
            if (! err) {
                res.json(Ok);
            } else {
                res.json(err);
            }
        }
    );
};

clientsController.getBankAccounts = async (req, res) => {
    id = req.params.idclient;

    //console.log(`SELECT * FROM custom_bank_accounts WHERE id = ${id}`); process.exit(1);

    connection.execute(
        `SELECT * FROM custom_bank_accounts WHERE id_custom = ${id}`,
        (err, result) => {
            if (! err) {
                res.json(result);
            } else {
                res.json(err);
            }
        }
    )
};

clientsController.addBankAccount = async (req, res) => {
    id = req.params.idclient;

    query = `INSERT INTO custom_bank_accounts (id_custom, bank, account, address, city, province, zip)
        VALUES (${id},?,?,?,?,?,?);`;

    connection.execute(
        query, [
            req.body.bank,
            req.body.account,
            req.body.address,
            req.body.city,
            req.body.province,
            req.body.zip
        ], (err) => {

            res.json( !err ? Ok : err );

        }
    );

};

clientsController.putBankAccounts = async (req, res) => {
    id = req.params.id;

    query = `UPDATE custom_bank_accounts SET bank = ?, account = ?, address = ?, city = ?, province = ?, zip = ?
        WHERE id = ${id}`;

    connection.execute(
        query, [
            req.body.bank,
            req.body.account,
            req.body.address,
            req.body.city,
            req.body.province,
            req.body.zip
        ], (err) => {

            res.json( !err ? Ok : err );

        }
    );
};

clientsController.deleteBankAccounts = async (req, res) => {
    id = req.params.id;

    connection.query(
        `DELETE FROM custom_bank_accounts WHERE id=${id}`,
        (err) => {

            res.json( !err ? Ok : err );

        }
    )
};

clientsController.getPhonesById = async (req, res) => {
    id = req.params.id;

    connection.query(
        `SELECT * FROM custom_phones WHERE id=${id}`,
        (err, result) => {
            res.json( !err ? result[0] : err );
        }
    );
};

clientsController.getEmails = async (req, res) => {
    id = req.params.id;

    query = `SELECT * FROM custom_emails WHERE id_custom=${id}`;


    connection.query(
        query, (err, result) => {

          res.json( !err ? result : err);

        }
    );
};

clientsController.putEmail = async (req, res) => {
    id = req.params.id;

    query = `UPDATE custom_emails SET email = ?, verified = ?, memo = ? WHERE id = ${id}`;

    connection.execute(
        query, [
            req.body.email,
            req.body.verified,
            req.body.memo
        ], (err) => {

            res.json( !err ? Ok : err );

        }
    );
};

clientsController.getEmailById = async (req, res) => {
    id = req.params.id;

    connection.query(
        `SELECT * FROM custom_emails WHERE id=${id}`,
        (err, result) => {
            res.json( !err ? result[0] : err );
        }
    );
};

clientsController.deleteEmail = async (req, res) => {
    id = req.params.id;

    connection.query(
        `DELETE FROM custom_emails WHERE id=${id}`,
        (err) => {

            res.json( !err ? Ok : err );

        }
    );
};

clientsController.addEmail = async (req, res) => {
  id = req.params.idclient;

  query = `INSERT INTO custom_emails (id_custom, email, verified, memo) VALUES (${id},?,?,?);`;

  connection.execute(
    query,
    [
      req.body.email,
      req.body.verified,
      req.body.memo
    ], (err) => {

        res.json( !err ? Ok : err );

      }
  );
};


module.exports = clientsController;
/** this ends this file
* server/controllers/clients.controller
**/
