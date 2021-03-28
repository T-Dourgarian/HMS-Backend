const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const bookingSchema = new Schema({
	uuid: { type: String, default: uuid.v1() },
	addOns: { default: [], type: Array },
	roomUuid: { default: null, type: String },
    checkIn: { default: null, type: Date },
	checkOut: { default: null, type: Date },
	numberOfNights: { default: null, type: Number },
	roomPrice: { default: null, type: Number },
	addOnPrice: { default: null, type: Number },
	totalPrice: { default: null, type: Number },
	numberOfGuests: { default: null, type: Number },
	customerDetails: {
		name: { default: null, type: String },
		email: { default: null, type: String },
		phoneNumber: { default: null, type: String },
	},
	color: { default: '#FF5733', type: String},
	canceled: {default: false, type: Boolean }
});



const bookingDB = mongoose.model('booking', bookingSchema)

module.exports = bookingDB;