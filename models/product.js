let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: String,
    stock: Number,
    min_stock: Number,
    buy_price: Number,
    sell_price: Number,
    supplier: String,
    image: String
})

let Product = module.exports = mongoose.model('product', productSchema); //Parameter 1 adalah collection mongodb yang dikurangi huruf "s".