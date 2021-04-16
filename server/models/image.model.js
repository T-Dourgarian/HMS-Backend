const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const imageSchema = new Schema({
	uuid: { type: String, default: uuid.v1()},
	name: String,
	roomTypeUuid: String,
	path: String
});



const imageDB = mongoose.model('images', imageSchema)

module.exports = imageDB;