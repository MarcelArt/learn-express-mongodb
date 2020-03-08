const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

//models
const User = require('./models/user');

//routes
const product_routes = require('./routes/product_routes');

//init express;
const app = express();

//middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

//route middlewares
app.use('/products', product_routes);

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
			username,
			password
		},
		(err, user) => {
			const token = jwt.sign({user}, 'apahayo');
			res.send({token, user});
		}
	);
});

//start server
app.listen(3000, () => {
	console.log('Server started on port 3000...');
});
