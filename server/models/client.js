/**
* Name: client
*
* @author Pedro Ruiz Hidalgo
*		  correo@pedroruizhidalgo.es
*         @pedroruizhidalg
*
*		  Coding the world since 1983!
*
* Location: server/models/client
*
* Created:  24 Aug 2018
*
*
* Description:
*
* Requirements:
*
*/

const client = ({
    id: '',
    datecreation: '',
    first_name: '',
    last_name: '',
    tax_id_number: '',
    mobile: '',
    work_phone: '',
    home_phone: '',
    fax: '',
    pager: '',
    image: ''
});

const clientModel = ( client );

const addresses = {
    id: Number,
    id_custom: Number,
    date_creation: Date,
    address1: String,
    address2: String,
    city: String,
    province: String,
    zip: String
}

const clientAddress = ( addresses );

module.exports = {
    clientModel: clientModel,
    clientAddress: clientAddress
};

/** this ends this file
* server/models/client
**/