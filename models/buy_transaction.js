let mongoose = require('mongoose');

let productDetailSchema = mongoose.Schema({
    product_name: String,
    product_price: Number,
    count: Number,
});
let serviceDetailSchema = mongoose.Schema({
    service_name: String,
    service_price: Number,
    count: Number,
});

let buySchema = mongoose.Schema({
    cashier: String,
    transaction_date: Date,
    products: [productDetailSchema],
    services: [serviceDetailSchema],
    total: Number
})

let BuyTransaction = module.exports = mongoose.model('buy_transaction', buySchema); //Parameter 1 adalah collection mongodb yang dikurangi huruf "s".