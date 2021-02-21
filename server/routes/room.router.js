const express = require('express');
const router = express.Router();
const axios = require("axios");
const uuid = require('uuid');


// Import DBs
const roomDB = require('../models/room.model');
const addOnDb = require('../models/addOn.model');




router.post('/create', async(req,res) => {
    try {

		const { name, subtitle, description, addOns } = req.body;

		console.log('in create room');
		
		await roomDB.create({
			uuid: uuid.v1(),
			name,
			subtitle,
			description,
			addOns,
		});
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.get('/', async(req,res) => {
    try {

		console.log('in get rooms');
		
		const rooms = await roomDB.find({});

		const addOns = await addOnDb.find({});

		
		res.status(200).json({ rooms, addOns });

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.put('/update/:uuid', async(req,res) => {
    try {

		const { name, subtitle, description, addOns } = req.body;
		const { uuid } = req.params;

		console.log('in update room');
		
		await roomDB.update({ uuid },{
			name,
			subtitle,
			description,
			addOns,
		});
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

module.exports = router;