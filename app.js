const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const product_routes = require('./routes/product_routes');

mongoose.connect('mongodb://127.0.0.1:27017/kouvee');
let db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to mongodb');
});
db.on('error', e => {
	console.log(e);
});

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

//routes
app.get('/', (req, res) => {
	res.send('Startpoint');
});

app.use('/products', product_routes);

app.listen(3000, () => {
	console.log('Server started on port 3000...');
});
