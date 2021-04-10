const express = require('express');
const router = express.Router();
const axios = require("axios");
const uuid = require('uuid');


// Import DBs
const companyDB = require('../models/company.model');




router.post('/create', async(req,res) => {
    try {

		const { name } = req.body;

		console.log('in create company');
		
		await companyDB.create({
			uuid: uuid.v1(),
			name
		});
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.get('/:companyName', async(req,res) => {
    try {

		const { companyName } = req.params;

		console.log('in get company');
		
		const company = await companyDB.findOne({
			name: companyName
		});

		if(company) {
			res.status(200).json(company);
		} else {
			res.sendStatus(400);
		}
		

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});



module.exports = router;