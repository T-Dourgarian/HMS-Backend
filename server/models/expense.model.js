const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const expenseSchema = new Schema({
	uuid: { type: String, default: uuid.v1()},
	type: { type: String, default: null},
    description: { type: String, default: null },
	roomTypeUuid: { type: String, default: null },
	date: { type: Date, defualt: null },
	amount: { type: Number, default: null } 
}, { timestamps: true });



const expenseDB = mongoose.model('expenses', expenseSchema)

module.exports = expenseDB;