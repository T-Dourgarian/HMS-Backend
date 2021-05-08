const express = require('express');
const router = express.Router();
const axios = require("axios");
const uuid = require('uuid');


// Import DBs
const addOnDb = require('../models/addOn.model');




router.post('/create', async(req,res) => {
    try {

		const { name, cost, description, companyUuid } = req.body;

		console.log('in create addOn');
		
		await addOnDb.create({
			uuid: uuid.v1(),
			description,
			companyUuid,
			name,
			cost,
		});
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.get('/all', async(req,res) => {
    try {
		
		const addOns = await addOnDb.find({});

		res.status(200).json(addOns);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

module.exports = router;