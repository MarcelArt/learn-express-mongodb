let mongoose = require('mongoose');

let serviceSchema = mongoose.Schema({
    name: String,
    price: Number,
})

let Service = module.exports = mongoose.model('service', serviceSchema); //Parameter 1 adalah collection mongodb yang dikurangi huruf "s".