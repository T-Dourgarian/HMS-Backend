const express = require('express');
const router = express.Router();
const uuid = require('uuid');
// const axios = require('axios');


// Import DBs
const expenseDB = require('../models/expense.model');
const expenseTypeDB = require('../models/expenseType.model');



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


router.get('/type/:companyUuid', async(req,res) => {
    try {

		const { companyUuid } = req.params;

		console.log('in get expense types')
		console.log('company',companyUuid)

		const expenseTypes = await expenseTypeDB.find(
			{
				companyUuid: companyUuid,
				active:true
			}
		);

		res.status(200).json(expenseTypes);

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

router.post('/create/type', async(req,res) => {
    try {

		const { type, companyUuid } = req.body;

		console.log('in create expense type');
		
		await expenseTypeDB.create({
			uuid: uuid.v1(),
			type,
			companyUuid
		});
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.delete('/:uuid', async(req,res) => {
    try {

		const { uuid } = req.params;

		console.log('in delete expense');
		
		await expenseDB.deleteOne({
			uuid
		});
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.put('/type/:uuid', async(req,res) => {
    try {

		const { uuid } = req.params;

		console.log('in delete expense type');
		
		await expenseTypeDB.updateOne({ uuid }, { active: false } );
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});



module.exports = router;