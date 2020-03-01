const express = require('express');
const error = require('../middleware/error');
const users = require('../app/controllers/api/users');
const auth = require('../app/controllers/api/auth');
const price = require('../app/controllers/api/price');
const category = require('../app/controllers/api/category');
const type = require('../app/controllers/api/types');
const package = require('../app/controllers/api/package');
const product = require('../app/controllers/api/products');
const sale = require('../app/controllers/api/sale');
const returns = require('../app/controllers/api/returns');
const orders = require('../app/controllers/api/order');
const expense = require('../app/controllers/api/expense');
const credit = require('../app/controllers/api/credits');
const customer = require('../app/controllers/api/customers');
const customerUser = require('../app/controllers/api/customer');
const bills = require('../app/controllers/api/bills');
const cash = require('../app/controllers/api/otherCash');
const opp = require('../app/controllers/api/oppCash');
const employee = require('../app/controllers/api/employee');
const companyAccounts = require('../app/controllers/api/companyAccount');
const purchaseBills = require('../app/controllers/api/purchaseBills');
const companyLedger = require('../app/controllers/api/companyLeger');


module.exports = function (app) {
	app.use(express.json());
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept-Encoding, Accept-Language');
		next();
	});
	
	app.use('/api/auth', auth);
	app.use('/api/users', users);
	app.use('/api/price', price)
	app.use('/api/category', category)
	app.use('/api/type', type)
	app.use('/api/package' , package)
	app.use('/api/product' , product)
	app.use('/api/sale' , sale)
	app.use('/api/return' , returns)
	app.use('/api/order' , orders)
	app.use('/api/expense' , expense)
	app.use('/api/credits' , credit)
	app.use('/api/customers' , customer)
	app.use('/api/customer' , customerUser)
	app.use('/api/bills' , bills)
	app.use('/api/cash' , cash)
	app.use('/api/opp' , opp)
	app.use('/api/employee' , employee)
	app.use('/api/companyAccount' , companyAccounts)
	app.use('/api/purchaseBills' , purchaseBills)
	app.use('/api/ledger' , companyLedger)
	app.use(error);
}