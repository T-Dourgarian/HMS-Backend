const mongoose = require('mongoose');

const { Schema } = mongoose;

const addOnSchema = new Schema({
	uuid: String,
	name: String,
    cost: Number,
});



const addOnDb = mongoose.model('addOn', addOnSchema)

module.exports = addOnDb;