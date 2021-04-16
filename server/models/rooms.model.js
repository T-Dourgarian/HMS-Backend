const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const roomsSchema = new Schema({
    uuid: String,
	companyUuid: { default: null, type: String },
	roomTypeUuid: String,
    roomNumber: String,
	floor: Number,
	status: { type: String, enum: ['Open', 'Occupied'] },
	active: { default: true, type: Boolean }
});



const roomsDb = mongoose.model('rooms', roomsSchema)

module.exports = roomsDb;