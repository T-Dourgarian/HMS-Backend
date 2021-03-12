const express = require('express');
const router = express.Router();
const axios = require("axios");


// Import DBs
const listingDB = require('../models/listing.model');
const roomDB = require('../models/room.model');




router.get('/', async (req,res) => {
    try {

		const { checkIn, checkOut } = req.query;

		const bookedListings = await listingDB.aggregate([
			{
				$match: {
					$and: [ {date: { $gte: new Date(checkIn) }}, { date: { $lt: new Date(checkOut) }} , { booked : true }],
				}
			},
		]);
		
		let listings = await listingDB.aggregate(
			[
				{
					$match: {
						$and: [ {date: { $gte: new Date(checkIn) }}, { date: { $lt: new Date(checkOut) }}],
					}
				},
				{
					$group: { 
						_id: '$roomUuid',
						checkIn: { $min: '$date' }, 
						totalPrice: { $sum: '$price' },
						allDates: { $push:  '$date' },
						listingUuids: { $push:  '$uuid' },
						numberOfNights: { $sum: 1 } 
					}
				},
				{
					$lookup : {
						from: 'rooms',
						localField: '_id',
						foreignField: 'uuid',
						as: 'room'
					}
				},
				{ 
					$sort : { 
						totalPrice : 1 
					} 
				},
			]
		);



		// remove all listings for room if any one listing is already booked.

		listings = listings.filter(listing => {


			for (listingUuid of listing.listingUuids) {
				console.log(listingUuid)
				for(bookedListing of bookedListings) {
					if (listingUuid == bookedListing.uuid){
						return false;
					}
				}
			}

			return true;
		})


		res.status(200).json(listings)

    }catch(error) {
        console.log(error)
        res.sendStatus(400);
    }
});

module.exports = router;