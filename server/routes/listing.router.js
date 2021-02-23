const express = require('express');
const router = express.Router();
const axios = require("axios");


// Import DBs
const listingDB = require('../models/listing.model');
const roomDB = require('../models/room.model');




router.get('/', async (req,res) => {
    try {

		const { checkIn, checkOut } = req.query;
		
		const listings = await listingDB.aggregate(
			[
				{
					$match: {
						$and: [ {date: { $gte: new Date(checkIn) }}, { date: { $lte: new Date(checkOut) }}]
					}
				},
				{
					$group: { 
						_id: { roomUuid :'$roomUuid' }, 
						checkIn: { $min: '$date' }, 
						checkOut: { $max: '$date' }, 
						totalPrice: { $sum: '$price' },
						allDates: { $push:  '$date' },
						listingUuids: { $push:  '$uuid' },
					}
				},
				{
					$lookup : {
						from: 'rooms',
						localField: '_id.roomUuid',
						foreignField: 'uuid',
						as: 'room'
					}
				},
			]
		);


		res.status(200).json(listings)

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

module.exports = router;