const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const roomTypeSchema = new Schema({
    uuid: { type: String, default: uuid.v1()},
	companyUuid: { default: null, type: String },
    name: String,
    subtitle: String, 
	description: String,
	basePrice: Number,
	maxOccupancy : {type: Number, default: 2},
	addOns: [Object],
	amenities: [Object],
	numberOfRooms: Number,
	active: { default: true, type: Boolean }
});



const roomTypeDb = mongoose.model('roomType', roomTypeSchema)

module.exports = roomTypeDb;