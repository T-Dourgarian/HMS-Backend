const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
    uuid: String,
    name: String,
    subtitle: String, 
	description: String,
	addOns: [String]
});



const roomDB = mongoose.model('room', roomSchema)

module.exports = roomDB;