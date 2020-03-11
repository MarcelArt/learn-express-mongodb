const express = require('express');
const jwt = require('jsonwebtoken');
let BuyTransaction = require('../models/buy_transaction');
let Service = require('../models/service');
let Product = require('../models/product');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

//find one transaction
router.get('/:id', (req, res) => {
	BuyTransaction.findById(req.params.id, (err, buy) => {
		if (buy) {
			res.send({
				buy,
				message: 'Transaction fetched',
				status: 200
			});
		} else {
			res.send({
				message: 'ID not found',
				status: 401
			});
		}
	});
});


//init transaction
router.post('/', verifyToken, (req, res) => {
	jwt.verify(req.token, 'apahayo', (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			let buy = new BuyTransaction();

			buy.cashier = req.body.cashier;
			buy.total = 0;
			buy.transaction_date = new Date();
			buy.products = [];
			buy.services = [];

			buy.save(error => {
				if (error) {
					res.send({message: 'Database error', status: 500});
				} else {
					res.send({
						buy,
						message: 'Transaction initialized',
						status: 201
					});
				}
			});
		}
	});
});

router.post('/add/product/:id', verifyToken, (req, res) => {
	jwt.verify(req.token, 'apahayo', (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			let buy = {};
			const query = {_id: req.params.id};
			const {count, pid} = req.body;

			//find transaction first so it know the current data
			BuyTransaction.findById({_id: req.params.id}, (error, data) => {
				if (data) {
					buy = data;
				}
				else {
					res.send({
						error,
						message: 'Transaction id not found',
						status: 500
					})
				}
			});

			//find product id and push its data
			Product.findById({_id: pid}, (error, data) => {
				if (data) {
					//push new data to existing list
					buy.products.push({
						product_name: data.name,
						product_price: data.sell_price,
						count
					});
					buy.total += (data.sell_price*count);

					//update transaction collection
					BuyTransaction.update(query, buy, error => {
						if (error) {
							res.send({
								error,
								message: 'Failed adding product',
								status: 500
							});
						} else {
							res.send({
								message: 'Product added to transaction',
								status: 201
							});
						}
					});
				} else {
					res.send({
						error,
						message: 'Product id not found',
						status: 500
					});
				}
			});
		}
	});
});

module.exports = router;
