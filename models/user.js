const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    name: String,
    role: String
});

let User = module.exports = mongoose.model('user', userSchema);