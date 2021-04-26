const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const bookingSchema = new Schema({
	uuid: { default: null, type: String },
	companyUuid: { default: null, type: String },
	addOns: { default: [], type: Array },
	roomUuid: { default: null, type: String },
	roomTypeUuid: { default: null, type: String },
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
	canceled: {default: false, type: Boolean },
	checkedIn: {default: false, type: Boolean },
	checkedInDate: {default: null, type: String },
	checkedOut: {default: false, type: Boolean },
	checkedOutDate: {default: null, type: String },
});



const bookingDB = mongoose.model('booking', bookingSchema)

module.exports = bookingDB;