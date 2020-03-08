const express = require('express');
const jwt = require('jsonwebtoken');
let Product = require('../models/product');

const router = express.Router();

router.get('/all', (req, res) => {
	Product.find({}, (err, products) => {
		if (err) {
			console.log(err);
		} else {
			console.log({products});
			res.send({
				products,
				message: 'Products fetched',
				status: 200
			});
		}
	});
});

router.get('/:id', (req, res) => {
	Product.findById(req.params.id, (err, product) => {
		if (product) {
			res.send({
				product,
				message: 'Product fetched',
				status: 200
			});
		} else {
			res.send({
				message: 'ID not found',
				status: 200
			});
		}
	});
});

router.post('/add', verifyToken, (req, res) => {
	jwt.verify(req.token, 'apahayo', (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			let product = new Product();
			product.name = req.body.name;
			product.stock = req.body.stock;
			product.min_stock = req.body.min_stock;
			product.buy_price = req.body.buy_price;
			product.sell_price = req.body.sell_price;
			product.image = req.body.image;

			product.save(err => {
				if (err) {
					console.log(e);
					res.send({message: 'Database error', status: 500});
				} else {
					res.send({
						product,
						message: 'Product succesfully added',
						status: 201
					});
				}
			});
		}
	});
});

router.post('/edit/:id', (req, res) => {
	let product = {};
	let query = {_id: req.params.id};

	product.name = req.body.name;
	product.stock = req.body.stock;
	product.min_stock = req.body.min_stock;
	product.buy_price = req.body.buy_price;
	product.sell_price = req.body.sell_price;
	product.image = req.body.image;

	Product.update(query, product, err => {
		if (err) {
			console.log(err);
		} else {
			res.send({message: 'Product updated', status: 201});
		}
	});
});

//verify function
function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const [, bearerToken] = bearerHeader.split(' ');
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
}

module.exports = router;
