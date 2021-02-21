const mongoose = require('mongoose');

const { Schema } = mongoose;

const listingSchema = new Schema({
	uuid: String,
    date: Date,
	roomUuid: String,
	booked: Boolean,
	price: Number
});



const listingDB = mongoose.model('listing', listingSchema)

module.exports = listingDB;