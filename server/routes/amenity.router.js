const express = require('express');
const router = express.Router();
const axios = require("axios");
const uuid = require('uuid');


// Import DBs
const amenityDd = require('../models/amenity.model');


router.get('/', async(req,res) => {
    try {
		
		const amenities = await amenityDd.find({});

		res.status(200).json(amenities);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});


router.post('/create', async(req,res) => {
    try {

		const {
			name,
			icon,
		} = req.body;


		await amenityDd.create({
			uuid: uuid.v1(),
			name,
			icon
		})

		console.log(req.body)
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});


module.exports = router;