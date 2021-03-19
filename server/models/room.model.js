const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const roomSchema = new Schema({
    uuid: { type: String, default: uuid.v1()},
    name: String,
    subtitle: String, 
	description: String,
	basePrice: Number,
	maxOccupancy : {type: Number, default: 2},
	addOns: [Object]
});



const roomDB = mongoose.model('room', roomSchema)

module.exports = roomDB;