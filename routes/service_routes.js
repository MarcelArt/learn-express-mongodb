const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
let Service = require('../models/service');
const storage = require('../config/storage');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.get('/', (req, res) => {
	Service.find({}, (err, services) => {
		if (err) {
			console.log(err);
			res.send({
				error: err,
				message: 'Database error',
				status: 500
			});
		} else {
			console.log({services});
			res.send({
				services,
				message: 'services fetched',
				status: 200
			});
		}
	});
});

router.get('/:id', (req, res) => {
	Service.findById(req.params.id, (err, service) => {
		if (service) {
			res.send({
				service,
				message: 'Service fetched',
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
			Service.deleteOne({_id: req.params.id}, error => {
				if (err) {
					res.send({error});
				} else {
					res.send({
            message: 'Delete service success',
            status: 201
          });
				}
			});
		}
	});
});

router.post('/edit/:id', verifyToken, (req, res) => {
	jwt.verify(req.token, 'apahayo', (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			let service = {};
			let query = {_id: req.params.id};
			service = req.body;

			Service.update(query, service, err => {
				if (err) {
					res.send({
						error: err,
						message: 'Service updated failed',
						status: 500
					});
				} else {
					res.send({message: 'Service updated', status: 201});
				}
			});
		}
	});
});

router.post('/add', verifyToken, (req, res) => {
	jwt.verify(req.token, 'apahayo', (err, data) => {
		if (err) {
			res.sendStatus(403);
		} else {
			let service = new Service();

			service.name = req.body.name;
			service.price = req.body.price;

			service.save(err => {
				if (err) {
					console.log(e);
					res.send({message: 'Database error', status: 500});
				} else {
					res.send({
						service,
						message: 'service succesfully added',
						status: 201
					});
				}
			});
		}
	});
});



module.exports = router;