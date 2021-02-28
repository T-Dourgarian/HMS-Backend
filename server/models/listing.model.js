const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const listingSchema = new Schema({
	uuid: { type: String, default: uuid.v1()},
    date: Date,
	roomUuid: String,
	booked: Boolean,
	price: Number
});



const listingDB = mongoose.model('listing', listingSchema)

module.exports = listingDB;