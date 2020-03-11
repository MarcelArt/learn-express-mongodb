const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
let Product = require('../models/product');
const storage = require('../config/storage');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();
// const upload = multer({dest: 'uploads'});
const upload = multer({storage});

router.get('/', (req, res) => {
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
				status: 401
			});
		}
	});
});

router.get('/delete/:id', verifyToken, (req, res) => {
	jwt.verify(req.token, 'apahayo', (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			Product.deleteOne({_id: req.params.id}, error => {
				if (err) {
					res.send({error});
				} else {
					res.send({
            message: 'Delete product success',
            status: 201
          });
				}
			});
		}
	});
});

router.post('/edit/:id', verifyToken, upload.single('image'), (req, res) => {
	jwt.verify(req.token, 'apahayo', (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			let product = {};
			let query = {_id: req.params.id};

			// product.name = req.body.name;
			// product.stock = req.body.stock;
			// product.min_stock = req.body.min_stock;
			// product.buy_price = req.body.buy_price;
			// product.sell_price = req.body.sell_price;
			product = req.body;
			if (req.file) {
				product.image = req.file.filename;
			}

			Product.update(query, product, err => {
				if (err) {
					res.send({
						error: err,
						message: 'Product updated failed',
						status: 500
					});
				} else {
					res.send({message: 'Product updated', status: 201});
				}
			});
		}
	});
});

router.post('/add', verifyToken, upload.single('image'), (req, res) => {
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
			product.supplier = req.body.supplier;
			product.image = req.file.filename;

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

//test upload image
router.post('/image', upload.single('image'), (req, res) => {
	try {
		res.send({
			file: req.file,
			name: req.body.filename
		});
	} catch (e) {
		res.sendStatus(400);
	}
});

module.exports = router;
