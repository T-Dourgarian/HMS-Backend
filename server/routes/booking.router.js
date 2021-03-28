const express = require('express');
const router = express.Router();
const axios = require("axios");
const moment = require('moment');
const uuid = require('uuid');


// Import DBs
const roomDB = require('../models/room.model');
const addOnDb = require('../models/addOn.model');
const bookingDb = require('../models/booking.model');

// colors for calendar bookings
const colors = ['#407294','#5ac18e','#008080','#ffa500','#ff7373','#fa8072','#20b2aa','#468499','#6897bb','#66cdaa']

router.post('/create', async(req,res) => {
    try {

		const { 
			roomUuid,
			addOns,
			checkIn,
			checkOut,
			numberOfNights,
			listingsBooked,
			roomPrice,
			addOnPrice,
			totalPrice,
			numberOfGuests,
			customerDetails
		} = req.body;

		console.log( req.body)

		await bookingDb.create({
			roomUuid,
			addOns,
			checkIn,
			checkOut,
			numberOfNights,
			listingsBooked,
			roomPrice,
			addOnPrice,
			totalPrice,
			numberOfGuests,
			customerDetails,
			color: colors[Math.floor(Math.random() * colors.length - 1)]
		});
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});



router.get('/', async (req, res) => {
    try {
		const bookings = await bookingDb.aggregate([
			{
				$match: {
					canceled: false
				}
			},
			{
				$lookup : {
					from: 'rooms',
					localField: 'roomUuid',
					foreignField: 'uuid',
					as: 'room'
				}
			}
		]);
		
		res.status(200).json({ bookings });

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.put('/update/:uuid', async(req,res) => {
    try {

		console.log();
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.delete('/cancel/:uuid', async(req,res) => {
    try {
		const { uuid } = req.params;

		await bookingDb.updateOne({ uuid: uuid }, { canceled: true })

		res.sendStatus(200);
    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});


module.exports = router;