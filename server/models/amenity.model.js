const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const amenitySchema = new Schema({
	uuid: { type: String, default: uuid.v1()},
	name: String,
    icon: String,
	companyUuid: String
});



const amenityDB = mongoose.model('amenities', amenitySchema)

module.exports = amenityDB;