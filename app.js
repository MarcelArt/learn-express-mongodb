const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//models
const User = require('./models/user');

//routes
const product_routes = require('./routes/product_routes');
const service_routes = require('./routes/service_routes');

//init express;
const app = express();

//middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

//route middlewares
app.use('/products', product_routes);
app.use('/services', service_routes);

mongoose.connect('mongodb://127.0.0.1:27017/kouvee');
let db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to mongodb');
});
db.on('error', e => {
	console.log(e);
});

//routes
app.get('/', (req, res) => {
	res.send('Startpoint');
});

app.post('/login', (req, res) => {
	const {username, password} = req.body;
	User.findOne(
		{
			username
		},
		(err, user) => {
			bcrypt.compare(password, user.password).then(matched => {
				if (matched) {
					const token = jwt.sign({user}, 'apahayo');
					res.send({
						token,
						user,
						message: 'Login Success',
						status: 201
					});
				} else {
					res.send({
						message: 'Wrong password',
						status: 401
					});
				}
			})
			.catch(e => {
				res.send({
					error: e,
					message: 'Login failed',
					status: 500
				})
			});
		}
	);
});
app.post('/register', (req, res) => {
	const {username, password, name, role} = req.body;

	let user = new User();
	user.username = username;
	user.name = name;
	user.role = role;
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(password, salt, (err, hash) => {
			user.password = hash;
			user.save(e => {
				if (e) {
					console.log({e});
					res.send({
						error: e,
						message: 'Registration failed',
						status: 401
					});
				} else {
					res.send({
						user,
						message: 'User registered',
						status: 201
					});
				}
			});
		});
	});
});

//start server
app.listen(3000, () => {
	console.log('Server started on port 3000...');
});
