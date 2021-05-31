const express = require('express');
const router = express.Router();
const uuid = require('uuid');
// const axios = require('axios');


// Import DBs
const expenseDB = require('../models/expense.model');



router.get('/:roomTypeUuid', async(req,res) => {
    try {

		const { roomTypeUuid } = req.params;
		
		const expenses = await expenseDB.find({ roomTypeUuid });

		res.status(200).json(expenses);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.post('/create', async(req,res) => {
    try {

		const { description, type, roomTypeUuid, amount, date } = req.body;

		console.log('in create expense');
		
		await expenseDB.create({
			uuid: uuid.v1(),
			description,
			type,
			roomTypeUuid,
			amount,
			date
		});
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});


module.exports = router;