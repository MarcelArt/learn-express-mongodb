const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let Product = require('./models/product');
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

// app.get('/products/all', (req, res) => {
// 	Product.find({}, (err, products) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log({products});
// 			res.send({
// 				products,
// 				message: 'Products fetched',
// 				status: 200
// 			});
// 		}
// 	});
// });

// app.get('/products/:id', (req, res) => {
// 	Product.findById(req.params.id, (err, product) => {
// 		if (product) {
// 			res.send({
// 				product,
// 				message: 'Product fetched',
// 				status: 200
// 			});
//         }
//         else {
//             res.send({
// 				message: 'ID not found',
// 				status: 200
// 			});
//         }
// 	});
// });

// app.post('/products/add', (req, res) => {
// 	let product = new Product();
// 	product.name = req.body.name;
// 	product.stock = req.body.stock;
// 	product.min_stock = req.body.min_stock;
// 	product.buy_price = req.body.buy_price;
// 	product.sell_price = req.body.sell_price;
// 	product.image = req.body.image;

// 	product.save(err => {
// 		if (err) {
// 			console.log(e);
// 			res.send({message: 'Database error', status: 500});
// 		} else {
// 			res.send({
// 				product,
// 				message: 'Product succesfully added',
// 				status: 201
// 			});
// 		}
// 	});
// });

// app.post('/products/edit/:id', (req, res) => {
//     let product = {};
//     let query = {_id: req.params.id};

//     product.name = req.body.name;
// 	product.stock = req.body.stock;
// 	product.min_stock = req.body.min_stock;
// 	product.buy_price = req.body.buy_price;
// 	product.sell_price = req.body.sell_price;
//     product.image = req.body.image;
    
//     Product.update(query, product, (err) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             res.send({message: 'Product updated', status: 201});
//         }
//     });
// });

app.listen(3000, () => {
	console.log('Server started on port 3000...');
});
