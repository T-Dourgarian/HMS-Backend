const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const addOnSchema = new Schema({
	uuid: { type: String, default: uuid.v1()},
	name: String,
	description: String,
    cost: Number,
	companyUuid: String
});



const addOnDb = mongoose.model('addOn', addOnSchema)

module.exports = addOnDb;