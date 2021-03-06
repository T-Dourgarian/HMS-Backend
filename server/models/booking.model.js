const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const bookingSchema = new Schema({
	uuid: { type: String, default: uuid.v1() },
	roomUuid: { default: null, type: String },
    checkIn: { default: null, type: Date },
	checkOut: { default: null, type: Date },
	numberOfNights: { default: null, type: Number },
	listingsBooked: { default: null, type: [String] },
	roomPrice: { default: null, type: Number },
	addOnPrice: { default: null, type: Number },
	totalPrice: { default: null, type: Number },
	numberOfGuests: { default: null, type: Number },
	customerDetails: {
		name: { default: null, type: String },
		email: { default: null, type: String },
		phoneNumber: { default: null, type: Number },
	}
});



const bookingDB = mongoose.model('booking', bookingSchema)

module.exports = bookingDB;