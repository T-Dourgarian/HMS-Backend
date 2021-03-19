const express = require('express');
const router = express.Router();
const axios = require("axios");
const moment = require('moment');
const uuid = require('uuid');


// Import DBs
const roomDB = require('../models/room.model');
const addOnDb = require('../models/addOn.model');
const listingDb = require('../models/listing.model');
const bookingDb = require('../models/booking.model');

// colors for calendar bookings
const colors = ['#407294','#5ac18e','#008080','#ffa500','#ff7373','#fa8072','#20b2aa','#468499','#6897bb','#66cdaa']

router.post('/create', async(req,res) => {
    try {

		const { 
			roomUuid,
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

		console.log('create successful')
		
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
				$lookup : {
					from: 'rooms',
					localField: 'roomUuid',
					foreignField: 'uuid',
					as: 'room'
				}
			}
		]);

		console.log(bookings[0])
		
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

router.delete('/delete/:uuid', async(req,res) => {
    try {

		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});


module.exports = router;