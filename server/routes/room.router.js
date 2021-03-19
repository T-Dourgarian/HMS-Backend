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




router.post('/create', async(req,res) => {
    try {

		const { name, subtitle, description, addOns, basePrice } = req.body;

		console.log('in create room');

		const newRoomUuid = uuid.v1();
		
		await roomDB.create({
			uuid: newRoomUuid,
			name,
			subtitle,
			description,
			basePrice,
			addOns,
		});


		// creating 6 months of listing documents for new room
		const currentMoment = moment();
		const endMoment = moment().add(6, 'months');

		let newListings = [];

		while (currentMoment.isBefore(endMoment, 'day')) {
			
			newListings.push({
				uuid: uuid.v1(),
				date: new Date(currentMoment),
				roomUuid: newRoomUuid,
				booked: false,
				price: basePrice
			});

			currentMoment.add(1, 'days');
		}


		await listingDb.insertMany(newListings);
		
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


router.get('/listings', async (req, res) => { // returns all rooms that are not already booked between the checkin and out dates
    try {

		const { checkIn, checkOut } = req.query;

		console.log('in get listings');

		const bookings = await bookingDb.aggregate([
			{ 
				$match: {
					$or: [
						{
							checkIn: {
								$gte: new Date(checkIn) ,
								$lt: new Date(checkOut) 
							}
						},
						{
							checkOut: {
								$gte: new Date(checkIn) ,
								$lt: new Date(checkOut) 
							}
						},
					]
				} 
			},
			{
				$project: {
					roomUuid: 1
				}
			}
		]);

		const rooms = await roomDB.find({});
		
		let listings = rooms.filter(room => {
			for (booking of bookings) {
				if (booking.roomUuid == room.uuid) {
					return false;
				}
			}
			return true;
		});

		console.log(listings)

		res.status(200).json(listings);

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

router.delete('/delete/:uuid', async(req,res) => {
    try {
		const { uuid } = req.params;
		
		await listingDb.deleteMany({ roomUuid: uuid, booked: false });

		await roomDB.deleteOne({ uuid });

		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});


module.exports = router;