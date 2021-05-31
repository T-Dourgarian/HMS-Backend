const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const userSchema = new Schema({
	uuid: { type: String, default: uuid.v1()},
	companyUuid: { default: null, type: String },
	username: String,
	password: String
}, { timestamps: true });



const userDB = mongoose.model('users', userSchema)

module.exports = userDB;