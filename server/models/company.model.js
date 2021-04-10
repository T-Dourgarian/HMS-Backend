const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const companySchema = new Schema({
	uuid: { type: String, default: uuid.v1()},
	name: String,
});



const companyDB = mongoose.model('companies', companySchema)

module.exports = companyDB;