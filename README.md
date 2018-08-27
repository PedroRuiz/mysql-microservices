# mysql-microservices
## Definition
mysql-microservices is a implementation of **node** for maintenance of main tables in a bussines.

## Tables Creation

### custom_customers ###
```
'CREATE TABLE `custom_customers` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `tax_id_number` varchar(30) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `work_phone` varchar(50) DEFAULT NULL,
  `home_phone` varchar(50) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `pager` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tax_id_number` (`tax_id_number`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8'
```
### custom_phones ###
```
'CREATE TABLE `custom_phones` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `id_custom` mediumint(8) unsigned NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone_type` enum(''landline'',''mobile'',''fax'',''branch'',''other'') NOT NULL,
  `prefix` char(4) DEFAULT NULL,
  `phone` varchar(30) NOT NULL,
  `suffix` varchar(45) DEFAULT NULL,
  `memo` text,
  PRIMARY KEY (`id`),
  KEY `fk_phones_custon_id` (`id_custom`),
  CONSTRAINT `fk_phones_custon_id` FOREIGN KEY (`id_custom`) REFERENCES `custom_customers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8'
```
### custom_bank_accounts ###
```
'CREATE TABLE `custom_bank_accounts` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `id_custom` mediumint(8) unsigned NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `account` varchar(100) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `zip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bancks_custon_id` (`id_custom`),
  CONSTRAINT `fk_bancks_custon_id` FOREIGN KEY (`id_custom`) REFERENCES `custom_customers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8'
```
### custom_addresses ###
```
'CREATE TABLE `custom_addresses` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `id_custom` mediumint(8) unsigned NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `invoice_address` bit(1) NOT NULL DEFAULT b''0'',
  `address_1` varchar(100) NOT NULL,
  `address_2` varchar(100) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `zip` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_addresses_custon_id` (`id_custom`),
  CONSTRAINT `fk_addresses_custon_id` FOREIGN KEY (`id_custom`) REFERENCES `custom_customers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8'
```
### products_products ###
```
'CREATE TABLE `products_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00'' ON UPDATE CURRENT_TIMESTAMP,
  `code` varchar(45) NOT NULL,
  `description` tinytext NOT NULL,
  `size` decimal(6,2) DEFAULT NULL,
  `size_units` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `weight` decimal(6,2) DEFAULT NULL,
  `weight_units` varchar(45) DEFAULT NULL,
  `price` decimal(6,2) NOT NULL,
  `stock` decimal(6,2) NOT NULL,
  `broken_stock` decimal(6,2) NOT NULL,
  `on_sale` decimal(6,2) DEFAULT NULL,
  `to_serve` decimal(6,2) DEFAULT NULL,
  `to_receive` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1'
```

### products_images ###
```
'CREATE TABLE `products_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updation_date` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00'' ON UPDATE CURRENT_TIMESTAMP,
  `image` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_images_1_idx` (`product_id`),
  CONSTRAINT `fk_products_images_1` FOREIGN KEY (`product_id`) REFERENCES `products_products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1'
```

### suppliers_suppliers ###
```
'CREATE TABLE `suppliers_suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00'' ON UPDATE CURRENT_TIMESTAMP,
  `type` enum(''person'',''company'') NOT NULL DEFAULT ''person'',
  `tax_id` varchar(45) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tax_id_index` (`tax_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8'
```

### suppliers_phones ###
```
'CREATE TABLE `suppliers_phones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_supplier` int(11) NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00'' ON UPDATE CURRENT_TIMESTAMP,
  `default_phone` enum(''0'',''1'') NOT NULL DEFAULT ''0'',
  `prefix` varchar(6) DEFAULT NULL,
  `number` varchar(45) NOT NULL,
  `suffix` varchar(45) DEFAULT NULL,
  `memo` text,
  PRIMARY KEY (`id`),
  KEY `fk_suppliers_phones_1_idx` (`id_supplier`),
  CONSTRAINT `fk_suppliers_phones_1` FOREIGN KEY (`id_supplier`) REFERENCES `suppliers_suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8'
```
### suppliers_bank_accounts ###
```
'CREATE TABLE `suppliers_bank_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_supplier` int(11) NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00'' ON UPDATE CURRENT_TIMESTAMP,
  `account` varchar(45) NOT NULL,
  `address` varchar(60) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `memo` text,
  PRIMARY KEY (`id`),
  KEY `fk_suppliers_bank_accounts_1_idx` (`id_supplier`),
  CONSTRAINT `fk_suppliers_bank_accounts_1` FOREIGN KEY (`id_supplier`) REFERENCES `suppliers_suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8'
```
### suppliers_addresses ###
```
'CREATE TABLE `suppliers_addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_supplier` int(11) NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00'' ON UPDATE CURRENT_TIMESTAMP,
  `invoice_address` enum(''1'',''0'') NOT NULL DEFAULT ''0'',
  `address_1` varchar(60) NOT NULL,
  `address_2` varchar(60) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `province` varchar(45) NOT NULL,
  `zip` varchar(45) NOT NULL,
  `memo` text,
  PRIMARY KEY (`id`),
  KEY `fk_suppliers_addresses_1_idx` (`id_supplier`),
  CONSTRAINT `fk_suppliers_addresses_1` FOREIGN KEY (`id_supplier`) REFERENCES `suppliers_suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8'
```
## Routes ##
Main routes are defined in **server/index.js**, as usually we need to version APIs, in the constant **URL_version** is the url suffix.
E.g.  ```http://localhost:3000/api/v1/```.
After **v1** url segment, there are three main segments as: 'clients', 'products' and 'suppliers'.
Lets say we need to connect by get http verb to get customs list:
```http://localhost:3000/api/v1/clients/```

### routes for clients ###

| action route             | method    | url                                               |  params   |
|:-------------------------|:----------|:--------------------------------------------------|:----------|
| get all clients          | get       | http://localhost:3000/api/v1/clients              |           |
| get one clients          | get       | http://localhost:3000/api/v1/clients/id           | idclient  |
| get client all addresses | get       | http://localhost:3000/api/v1/clients/addresses/id | idclient  |
| get address by id        | get       | http://localhost:3000/api/v1/clients/address/id   | idaddress |
| get client all phones    | get       | http://localhost:3000/api/v1/clients/phones/id    | idclient  |
| get banks of client      | get       | http://localhost:3000/api/v1/clients/banks/id     | idclient  |
| create client            | post      | http://localhost:3000/api/v1/clients/             |           |
| create client's address  | post      | http://localhost:3000/api/v1/clients/addresses/id | idclient  |
| create client's phone    | post      | http://localhost:3000/api/v1/clients/phones/id    | idclient  |
| create client's bank     | post      | http://localhost:3000/api/v1/clients/banks/id     | idclient  |
| update client            | put       | http://localhost:3000/api/v1/clients/id           | idclient  |
| update client's address  | put       | http://localhost:3000/api/v1/clients/addresses/id | idaddress |
| update client's bank     | put       | http://localhost:3000/api/v1/clients/banks/id     | idbank    |
| delete client            | delete    | http://localhost:3000/api/v1/clients/id           | idclient  |
| delete client's address  | delete    | http://localhost:3000/api/v1/clients/addresses/id | idaddress |
| delete client's phones   | delete    | http://localhost:3000/api/v1/clients/phones/id    | idphone   |
| delete client's bank     | delete    | http://localhost:3000/api/v1/clients/banks/id     | idbank    |

As you saw in the section of tables creation, the behaviour of deletion client causes the deletion in cascade of other asociated data.

### routes for products ###
| action route                 | method    | url                                                         |  params   |
|:-----------------------------|:----------|:------------------------------------------------------------|:----------|
| get all products             | get       | http://localhost:3000/api/v1/products/p/                    |           |
| get product by id            | get       | http://localhost:3000/api/v1/products/p/id                  | idproduct |
| get product by code          | get       | http://localhost:3000/api/v1/products/p/code/id             | code      |
| get product's image          | get       | http://localhost:3000/api/v1/products/p/image/id            | idproduct |
| get image by id              | get       | http://localhost:3000/api/v1/products/i/image/id            | idimage   |
| create product               | post      | http://localhost:3000/api/v1/products/p/                    |           |
| create product image         | post      | http://localhost:3000/api/v1/products/i/id                  | idprduct  |
| update product               | put       | http://localhost:3000/api/v1/products/p/id                  | idprduct  |
| add to product stock (1)     | put       | http://localhost:3000/api/v1/products/p/addstock/id         | idprduct  |
| add to product to_serve (1)  | put       | http://localhost:3000/api/v1/products/p/addtoserve/id       | idprduct  |
| add to product to_receive (1)| put       | http://localhost:3000/api/v1/products/p/addtoreceive/id     | idprduct  |
| delete product               | delete    | http://localhost:3000/api/v1/products/p/id                  | idprduct  |
| delete product's image       | delete    | http://localhost:3000/api/v1/products/i/id                  | idimage   |
(1) use negative numbers to substract

### routes for suppliers ###
| action route                 | method    | url                                                         |  params    |
|:-----------------------------|:----------|:------------------------------------------------------------|:-----------|
| get all suppliers            | get       | http://localhost:3000/api/v1/suppliers/s/                   |            |
| get supplier by id           | get       | http://localhost:3000/api/v1/suppliers/s/id                 | idsupplier |
| get supplier phones          | get       | http://localhost:3000/api/v1/suppliers/p/id                 | idsupplier |
| get supplier phones          | get       | http://localhost:3000/api/v1/suppliers/p/id/id              | idphone    |
| get supplier banks           | get       | http://localhost:3000/api/v1/suppliers/b/id                 | idsupplier |
| get supplier addresses       | get       | http://localhost:3000/api/v1/suppliers/a/id                 | idsupplier |
| create supplier              | post      | http://localhost:3000/api/v1/suppliers/s/                   |            |
| create supplier phone        | post      | http://localhost:3000/api/v1/suppliers/p/id                 | idsupplier |
| create supplier bank         | post      | http://localhost:3000/api/v1/suppliers/b/id                 | idsupplier |
| create supplier address      | post      | http://localhost:3000/api/v1/suppliers/a/id                 | idsupplier |
| delete supplier              | delete    | http://localhost:3000/api/v1/suppliers/s/id                 | idsupplier |
| delete supplier phone        | delete    | http://localhost:3000/api/v1/suppliers/p/id                 | idsupplier |
| delete supplier bank         | delete    | http://localhost:3000/api/v1/suppliers/b/id                 | idsupplier |
| delete supplier address      | delete    | http://localhost:3000/api/v1/suppliers/a/id                 | idsupplier |
| update supplier              | put       | http://localhost:3000/api/v1/suppliers/s/id                 | idsupplier |
| update supplier phone        | put       | http://localhost:3000/api/v1/suppliers/p/id                 | idsupplier |
| update supplier bank         | put       | http://localhost:3000/api/v1/suppliers/b/id                 | idsupplier |
| update supplier address      | put       | http://localhost:3000/api/v1/suppliers/a/id                 | idsupplier |



## expected formats ##

### client creation ###
```
{
  "first_name": "string",
  "last_name": "string",
  "tax_id_number": "string", // to validate on client if needed, index unique
  "mobile": "string",
  "work_phone": "string",
  "home_phone": "string",
  "fax": "string",
  "pager": "string",
  "image": "string"
}
```
### client address creation ###
```
{
  "address_1": "string",
  "address_2": "string",
  "city": "string",
  "province": "string",
  "zip": "string"
}
```
### client phone creation ###
```
{
  "phone_type": "string", // valid types: 'landline','mobile','fax','branch' and 'other'
  "prefix":"string",
  "phone": "string",
  "suffix": "string", // used for extensions and other...
  "memo": "string"
}
```
### client bank creation ###
```
{
  "account":  "string", // to validate in client if needed, unique
  "address":  "string",
  "city":  "string",
  "province":  "string",
  "zip":  "string"
}
```
### product creation ###
```
{
  "code": "string", // unique
  "description": "string",
  "size": "string",
  "size_units":"string",
  "color": "string",
  "weight": decimal, // node mysql2 api will return as string
  "weight_units": "string",
  "price": "string",
  "stock": "string",
  "broken_stock": "string",
  "on_sale": "string",
  "to_serve": "string",
  "to_receive": "string"
}
```