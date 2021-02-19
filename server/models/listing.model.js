const mongoose = require('mongoose');

const { Schema } = mongoose;

const listingSchema = new Schema({
    symbol: String,
    balanceUSD: Number,
    balanceBTC: Number, 
    priceUSD: Number,
    priceBTC: Number
});



const listingDB = mongoose.model('listing', listingSchema)

module.exports = listingDB;