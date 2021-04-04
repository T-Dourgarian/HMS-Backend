const express = require('express');
const router = express.Router();
const axios = require("axios");
const moment = require('moment');
const uuid = require('uuid');


// Import DBs
const roomsDb = require('../models/rooms.model');
const roomTypeDb = require('../models/roomType.model');
const addOnDb = require('../models/addOn.model');
const bookingDb = require('../models/booking.model');
const amenityDB = require('../models/amenity.model');




router.post('/create', async(req,res) => {
    try {

		const { name, subtitle, description, addOns, basePrice, amenities, numberOfRooms } = req.body;


		console.log('in create room');

		const newRoomUuid = uuid.v1();
		
		await roomTypeDb.create({
			uuid: newRoomUuid,
			name,
			subtitle,
			description,
			basePrice,
			addOns,
			amenities,
			numberOfRooms
		});

		let rooms = [];


		for (let i = 1; i <= numberOfRooms; i++) {

			rooms.push({
				uuid: uuid.v1(),
				roomTypeUuid: newRoomUuid,
				roomNumber: i,
				floor: 1,
				status: 'Open'
			})
		}

		await roomsDb.insertMany(rooms);
		
		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.get('/', async(req,res) => {
    try {

		console.log('in get rooms');
		
		const rooms = await roomTypeDb.find({});

		const addOns = await addOnDb.find({});

		const amenities = await amenityDB.find({});

		
		res.status(200).json({ rooms, addOns, amenities });

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});


router.get('/listings', async (req, res) => { // returns all rooms that are not already booked between the checkin and out dates
    try {



		const { checkIn, checkOut, bookingUuid } = req.query;

		console.log('in get listings');


		let aggr = [{ 
			$match: {
				$and: [
					{
						checkIn: {
							$lt: new Date(checkOut) 
						}
					},
					{
						checkOut: {
							$gt: new Date(checkIn),
						}
					},
					{
						canceled: false
					},
				]
			} 
		},
		{
			$project: {
				roomUuid: 1
			}
		}]



		// need to exclude the current booking that is being updated from the booking query
		if (bookingUuid) {
			aggr[0]['$match']['$and'].push({
				uuid: {
					$nin: [ bookingUuid ]
				}
			})
		}



		let bookings = await bookingDb.aggregate(aggr);


		let bookedRooms = bookings.map(booking => booking.roomUuid);

		console.log('bookings',bookedRooms);

		// get a all the rooms that are not already booked, and return their roomtypes


		let availableRooms = await roomsDb.find({
			uuid : { $nin : bookedRooms }
		})

		console.log('availableRooms', availableRooms);

		let roomTypeUuids = [];

		for (const room of availableRooms) {
			if (!roomTypeUuids.includes(room.roomTypeUuid)) {
				roomTypeUuids.push(room.roomTypeUuid)
			}
		}


		console.log('roomTypeUuids', roomTypeUuids)
		
		const roomTypes = await roomTypeDb.find({ 
			uuid: { $in: roomTypeUuids }
		});

		console.log('roomTypes', roomTypes)

		if (bookingUuid) {
			res.status(200).json({roomTypes, rooms: availableRooms});
		} else {
			res.status(200).json(roomTypes);
		}

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

router.put('/update/:uuid', async(req,res) => {
    try {

		const { name, subtitle, description, addOns, amenities } = req.body;
		const { uuid } = req.params;

		console.log('in update room');
		
		await roomTypeDb.update({ uuid },{
			name,
			subtitle,
			description,
			addOns,
			amenities
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

		const occupiedRoom = await roomsDb.find({ roomTypeUuid: uuid, status: 'Occupied' })

		if (occupiedRoom[0]) {
			res.status(400).json({ error: 'You cannot delete a room that is currently booked.'});
		}

		await roomTypeDb.deleteOne({ uuid });
		await roomsDb.deleteMany({ roomTypeUuid: uuid });

		res.sendStatus(200);

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});


module.exports = router;