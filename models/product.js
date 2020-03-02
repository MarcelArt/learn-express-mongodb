let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: String,
    stock: Number,
    min_stock: Number,
    buy_price: Number,
    sell_price: Number,
    image: String
})

let Product = module.exports = mongoose.model('Product', productSchema);