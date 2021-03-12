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


// const bookingSchema = new Schema({
// 	uuid: { type: String, default: uuid.v1() },
// 	roomUuid: { default: null, type: String },
//     checkIn: { default: null, type: Date },
// 	checkOut: { default: null, type: Date },
// 	numberOfNights: { default: null, type: Number },
// 	listingsBooked: { default: null, type: [String] },
// 	roomPrice: { default: null, type: Number },
// 	addOnPrice: { default: null, type: Number },
// 	totalPrice: { default: null, type: Number },
// 	numberOfGuests: { default: null, type: Number },
// 	customerDetails: {
// 		name: { default: null, type: String },
// 		email: { default: null, type: String },
// 		phoneNumber: { default: null, type: Number },
// 	}
// });


router.post('/create', async(req,res) => {
    try {

		const { 
			roomUuid,
			checkIn,
			checkOut,
			lastNight,
			numberOfNights,
			listingsBooked,
			roomPrice,
			addOnPrice,
			totalPrice,
			numberOfGuests,
			customerDetails
		} = req.body;

		console.log( req.body)

		console.log('in booking')

		await bookingDb.create({
			roomUuid,
			checkIn,
			checkOut,
			lastNight,
			numberOfNights,
			listingsBooked,
			roomPrice,
			addOnPrice,
			totalPrice,
			numberOfGuests,
			customerDetails
		});

		console.log('create successful')

		await listingDb.updateMany({ uuid: { $in : listingsBooked } }, { booked: true })

		console.log('update successful')
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.get('/', async (req, res) => {
    try {

		console.log('in get bookings');
		
		const bookings = await bookingDb.find({});

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