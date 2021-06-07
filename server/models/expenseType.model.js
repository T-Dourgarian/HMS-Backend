const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const ExpenseTypeSchema = new Schema({
	uuid: { type: String, default: uuid.v1()},
	type: { type: String, default: null },
	companyUuid: { type: String, default: null },
	active: { type: Boolean, default: true },
}, { timestamps: true });



const ExpenseTypeDB = mongoose.model('expenseType', ExpenseTypeSchema)

module.exports = ExpenseTypeDB;