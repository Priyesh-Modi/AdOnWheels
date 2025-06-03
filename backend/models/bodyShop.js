const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bodyShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    role: { type: String, default: 'BodyShop' },
    address: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BodyShop', bodyShopSchema);
